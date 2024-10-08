import 'reflect-metadata';

import { join } from 'path';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSchema } from 'type-graphql';
import { HelloWorld } from './resolvers/hello-world-resolver';
import express from 'express';
import { UserResolver } from './resolvers/user-resolver';

const app = express();

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [HelloWorld, UserResolver],
    emitSchemaFile: join(process.cwd(), 'src/schema/schema.gql'),
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  app.use('/graphql', express.json(), expressMiddleware(server));

  app.listen(4000, () => console.log('Server running on: http://localhost:4000/graphql'));
}

bootstrap();
