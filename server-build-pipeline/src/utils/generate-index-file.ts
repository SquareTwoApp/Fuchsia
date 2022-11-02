import { EntityModel, Import, ServerAuth, ServerConfiguration } from "../types"
import { convertImports } from "./converters"

export function generateIndexFile(
  serverConfig: ServerConfiguration,
  models: EntityModel[],
  projectName: string
) {
  const importsBuilder: Import = {}
  importsBuilder['express-session'] = {
    session: { type: 'default' },
  }
  importsBuilder['connect-redis'] = {
    connectRedis: { type: 'default' },
  }
  importsBuilder['./utils/config'] = {
    REDIS_URL: { type: 'single' },
    MONGO_DB_URL: { type: 'single' },
    SESSION_SECRET: { type: 'single' },
    REDIS_PORT: { type: 'single' },
    PORT: { type: 'single' },
  }
  importsBuilder['ioredis'] = {
    Redis: { type: 'default' },
  }
  importsBuilder['mongoose'] = {
    connect: { type: 'single' },
  }
  importsBuilder['type-graphql'] = {
    buildSchema: { type: 'single' },
  }
  importsBuilder['path'] = {
    path: { type: 'default' },
  }
  importsBuilder['./utils/typegoose-middleware'] = {
    TypegooseMiddleware: { type: 'single' },
  }
  importsBuilder['./utils/object-id.scalar'] = {
    ObjectIdScalar: { type: 'single' },
  }
  importsBuilder['mongodb'] = {
    ObjectId: { type: 'single' },
  }
  importsBuilder['./utils/auth-checker'] = {
    authChecker: { type: 'single' },
  }
  importsBuilder['apollo-server-express'] = {
    ApolloServer: { type: 'single' },
  }
  importsBuilder['http'] = {
    http: { type: 'default' },
  }
  importsBuilder['express'] = {
    express: { type: 'default' },
  }
  importsBuilder['cors'] = {
    cors: { type: 'default' },
  }
  importsBuilder['uuid'] = {
    v4: { type: 'single', rename: 'uuid' },
  }
  importsBuilder['cookie-parser'] = {
    cookies: { type: 'default' },
  }
  importsBuilder['cookie-parser'] = {
    cookies: { type: 'default' },
  }
  importsBuilder['typedi'] = {
    Container: { type: 'single' },
  }
  importsBuilder['fs'] = {
    fs: { type: 'default' },
  }
  importsBuilder['graphql-redis-subscriptions'] = {
    RedisPubSub: { type: 'single' },
  }
  importsBuilder['graphql'] = {
    execute: { type: 'single' },
    subscribe: { type: 'single' },
  }
  importsBuilder['subscriptions-transport-ws'] = {
    SubscriptionServer: { type: 'single' },
  }
  importsBuilder['graphql-type-json'] = {
    GraphQLJSONObject: { type: 'single' },
  }
  importsBuilder['./utils/consts'] = {
    COOKIE_NAME: { type: 'single' },
  }
  importsBuilder['graphql-upload'] = {
    graphqlUploadExpress: { type: 'single' },
  }
  importsBuilder['./utils/s3-uploader'] = {
    S3Uploader: { type: 'single' },
  }
  if (serverConfig.authConfig.requiresAuth) {
    importsBuilder['./Authentication/Authentication.resolver'] = {
      AuthenticationResolver: { type: 'single' },
    }
  }
  const classBuilder = ['\n']
  classBuilder.push(`(async () => {`)
  classBuilder.push(`
  const redisStore = connectRedis(session);
  const redis = new Redis(\`\${REDIS_URL}:\${REDIS_PORT}\`);
  `)
  classBuilder.push(`
  const mongoose = await connect(MONGO_DB_URL, { dbName: "${projectName}" });
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
  `)
  classBuilder.push(`  const schema = await buildSchema({`)
  classBuilder.push(`    resolvers: [`)
  if (serverConfig.authConfig.requiresAuth) {
    classBuilder.push(`      AuthenticationResolver,`)
  }
  models.forEach(m => {
    if (!importsBuilder[`./${m.name}/${m.name}.resolver`]) {
      importsBuilder[`./${m.name}/${m.name}.resolver`] = {}
    }
    importsBuilder[`./${m.name}/${m.name}.resolver`][`${m.name}Resolver`] = {
      type: 'single',
    }
    classBuilder.push(`      ${m.name}Resolver,`)
  })
  classBuilder.push(`    ],`)
  classBuilder.push(
    `    emitSchemaFile: path.resolve(__dirname, "schema.graphql"),`
  )
  classBuilder.push(`    globalMiddlewares: [TypegooseMiddleware],`)
  classBuilder.push(`    scalarsMap: [`)
  classBuilder.push(`      { type: ObjectId, scalar: ObjectIdScalar },`)
  classBuilder.push(`      { type: Object, scalar: GraphQLJSONObject },`)
  classBuilder.push(`    ],`)
  classBuilder.push(`    validate: true,`)
  classBuilder.push(`    authChecker,`)
  classBuilder.push(`    container: Container,`)
  classBuilder.push(`    pubSub,`)
  classBuilder.push(`  });`)
  classBuilder.push(`  const app = express();`)
  classBuilder.push(`  app.set("trust proxy", 1);`)
  classBuilder.push(`
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
`)
  classBuilder.push(`  app.use(cookies());`)
  classBuilder.push(
    `  app.use(graphqlUploadExpress({ maxFileSize: 20000000, maxFiles: 10 }));`
  )
  classBuilder.push(`
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
  `)
  classBuilder.push(`
  app.get("/project-files/*", async (req, res) => {
    const fileKey = decodeURI(req.path.replace("/project-files/", ""));
    const uploader = Container.get(S3Uploader);
    uploader.getFile(fileKey, res);
  });
  `)
  classBuilder.push(`
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
  `)
  classBuilder.push(`  await apolloServer.start();`)
  classBuilder.push(`
  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  `)
  classBuilder.push(`  const server = http.createServer({}, app);`)
  classBuilder.push(`
  server.listen(PORT, () => {
    console.log(\`HTTPS Server is running on port \${PORT}\`);
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema,
        onConnect: async (connectionParams: string) => {
          const userSession = await redis.get(\`sess:\${connectionParams}\`);
          console.log(userSession);
          if (userSession) {
            const payload = JSON.parse(userSession);
            console.log(payload);

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
  app.listen(PORT + 1, () => {
    console.log(\`HTTP Server is running on port \${PORT + 1}\`);
  });
  `)
  classBuilder.push(
    `})().catch((err) => console.error(err)).then(() => console.log('server exited'));`
  )
  return convertImports(importsBuilder).concat(classBuilder.join('\n'))
}
