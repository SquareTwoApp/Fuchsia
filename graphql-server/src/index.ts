import fs from "fs";
import path from "path";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import { REDIS_URL, REDIS_PORT, DATABASE_NAME, MONGO_DB_URL, HTTP_PORT, APP_ENDPOINT, HTTPS_PORT, SESSION_SECRET, S3_ACCESS_KEY, S3_REGION, S3_SECRET } from './utils/config'
import session from "express-session";
import { connect } from "mongoose";
import { RedisPubSub } from "graphql-redis-subscriptions";
import { ObjectIdScalar } from "./utils/object-id.scalar";
import { ObjectId } from "mongodb";
import { authChecker } from "./utils/auth-checker";
import { buildSchema } from "type-graphql";
import { TypegooseMiddleware } from "./utils/typegoose-middleware";
import { GraphQLJSONObject } from "graphql-type-json";
import { Container } from "typedi";
import { UserResolver } from "./Users/User.resolver";
import { ApolloServer } from "apollo-server-express";
import { COOKIE_NAME } from "./consts";
import { S3Uploader } from "./utils/s3-uploader";
import https from "https";
import express, { json } from "express";
import cors from "cors";
import cookies from "cookie-parser";
import { graphqlUploadExpress } from "graphql-upload";
import { v4 as uuid } from "uuid";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import AWS from "aws-sdk";
import { InvitationResolver } from "./Invitations/Invitation.resolver";
import { OrganizationResolver } from "./Organizations/Organization.resolver";
import { ProjectResolver } from "./Projects/Project.resolver";
import { ServerConfigResolver } from "./Projects/ServerConfig/ServerConfig.resolver";
import { ServerResolver } from "./Server/Server.resolver";

const key = fs.readFileSync(path.join(__dirname, "./cert/key.pem"));
const cert = fs.readFileSync(path.join(__dirname, "./cert/cert.pem"));

(async () => {

  const credentials = new AWS.Credentials(S3_ACCESS_KEY, S3_SECRET);
  AWS.config.credentials = credentials;
  AWS.config.region = S3_REGION;

  const redisStore = connectRedis(session);
  const redis = new Redis(`${REDIS_URL}:${REDIS_PORT}`);

  const mongoose = await connect(MONGO_DB_URL, { dbName: DATABASE_NAME });
  const options = {
    host: REDIS_URL,
    port: REDIS_PORT,
    retryStrategy: (times: number) => {
      return Math.min(times * 50, 2000);
    },
  };

  const pubSub = new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options),
  });
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      InvitationResolver,
      OrganizationResolver,
      ProjectResolver,
      ServerConfigResolver,
      ServerResolver
    ],
    emitSchemaFile: path.resolve(__dirname, "schema.graphql"),
    globalMiddlewares: [TypegooseMiddleware],
    scalarsMap: [
      { type: ObjectId, scalar: ObjectIdScalar },
      { type: Object, scalar: GraphQLJSONObject },
    ],
    validate: true,
    authChecker,
    container: Container,
    pubSub,
  });

  const app = express();

  app.set("trust proxy", 1);
  app.use(json({ limit: "2mb" }));
  app.use(
    cors({
      origin: [APP_ENDPOINT, 'http://localhost:3002'],
      credentials: true,
    })
  );
  app.use(cookies());

  app.use(graphqlUploadExpress({ maxFileSize: 20000000, maxFiles: 10 }));

  app.use(
    session({
      genid: (req) => uuid(),
      name: COOKIE_NAME,
      store: new redisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "none", // csrf
        secure: true,
        domain:
          process.env.NODE_ENV === "production" ? "fuschia.com" : undefined,
      },
      saveUninitialized: true,
      secret: SESSION_SECRET,
      resave: false,
    })
  );

  app.get(`/project-files/*`, async (req, res) => {
    const fileKey = decodeURI(req.path.replace("/project-files/", ""));
    const uploader = Container.get(S3Uploader);
    const file = uploader.getFile(fileKey, res);
  });

  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req, res }: any) => {
      return {
        getUser: () => req.user,
        logout: () => req.logout(),
        req,
        res,
        redis,
      };
    },
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: [APP_ENDPOINT, 'http://localhost:3002'],
      credentials: true,
    },
  });
  const server = https.createServer({ key: key, cert: cert }, app);
  server.listen(HTTPS_PORT, () => { 
    console.log(`\x1b[36m[Express]\x1b[0m >> HTTPS Server is running on port ${HTTPS_PORT}`);
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema,
        onConnect: async (connectionParams: string) => {
          const userSession = await redis.get(`sess:${connectionParams}`);
          if (userSession) {
            const payload = JSON.parse(userSession);
            return { userId: payload.userId };
          }
          return null;
        },
      },
      {
        server,
        path: "/subscriptions",
      }
    );
  });
  app.listen(HTTP_PORT, () => {
    console.log(`\x1b[36m[Express]\x1b[0m >> HTTP Server is running on port ${HTTP_PORT}`);
  });

})().catch((err) => console.error(err));