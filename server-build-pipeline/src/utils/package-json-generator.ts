export function generatePackageJson(organizationName: string, projectName: string, version: string): any {
  return `{
    "name": "@${organizationName}/${projectName}Server",
    "version": "${version}",
    "main": "index.js",
    "license": "MIT",
    "scripts": {
      "build": "tsc",
      "start": "ts-node src/index.ts",
      "start:dev": "NODE_TLS_REJECT_UNAUTHORIZED='0' DEBUG=express-session nodemon --watch src -e ts --exec \\"yarn start\\""
    },
    "dependencies": {
      "@typegoose/typegoose": "^9.6.2",
      "apollo-server": "^3.6.3",
      "argon2": "^0.28.4",
      "aws-sdk": "^2.1113.0",
      "body-parser": "^1.19.1",
      "class-validator": "^0.13.2",
      "connect-redis": "^6.1.1",
      "cookie-parser": "^1.4.6",
      "cors": "^2.8.5",
      "dotenv": "^16.0.0",
      "express-session": "^1.17.2",
      "graphql": "^15.3.0",
      "graphql-redis-subscriptions": "^2.4.2",
      "graphql-type-json": "^0.3.2",
      "graphql-upload": "^13.0.0",
      "ioredis": "^4.28.5",
      "jsonwebtoken": "^8.5.1",
      "lexorank": "^1.0.4",
      "mongoose": "^6.2.1",
      "reflect-metadata": "^0.1.13",
      "subscriptions-transport-ws": "^0.11.0",
      "type-graphql": "^1.1.1",
      "typedi": "^0.10.0",
      "uuid": "^8.3.2"
    },
    "devDependencies": {
      "@types/connect-redis": "^0.0.18",
      "@types/cookie-parser": "^1.4.2",
      "@types/express-session": "^1.17.4",
      "@types/graphql-upload": "^8.0.11",
      "@types/ioredis": "^4.28.8",
      "@types/node": "^17.0.17",
      "@types/uuid": "^8.3.4",
      "nodemon": "^2.0.15",
      "ts-node": "^10.5.0",
      "typescript": "^4.5.5"
    }
  }`
}
