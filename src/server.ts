import 'reflect-metadata';

import path from 'node:path';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSchema } from 'type-graphql';
import { HelloWorld } from './resolvers/hello-world-resolver';
import express from 'express';

const app = express();

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [HelloWorld],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  app.use('/graphql', express.json(), expressMiddleware(server));

  app.listen(4000, () => console.log('Server running on: http://localhost:4000/graphql'));
}

bootstrap();
