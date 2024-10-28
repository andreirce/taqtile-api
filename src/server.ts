import 'reflect-metadata';
import express from 'express';

import { join } from 'path';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import { HelloWorld } from './resolvers/hello-world-resolver';
import { UserResolver } from './resolvers/user-resolver';
import { customFormatError } from './utils/custom-errors-handler';

const app = express();

export async function bootstrap(port: number) {
  const schema = await buildSchema({
    resolvers: [HelloWorld, UserResolver],
    emitSchemaFile: join(process.cwd(), 'src/schema/schema.gql'),
    validate: true,
  });

  const server = new ApolloServer({
    schema,
    includeStacktraceInErrorResponses: false,
    formatError: customFormatError,
  });

  await server.start();

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ req }),
    }),
  );

  app.listen(port, () => {
    console.log('Server running on: http://localhost:${port}/graphql');
  });

  return server;
}

bootstrap(4000);
