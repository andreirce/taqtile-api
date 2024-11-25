import 'reflect-metadata';

import express from 'express';

import { join } from 'path';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import { UserResolver } from '@graphql/modules/user/user.resolver';
import { customFormatError } from '@graphql/graphql-error.formatter';
import { AddressResolver } from '@graphql/modules/address/address.resolver';
import { Container } from 'typedi';
import { graphqlUploadExpress } from 'graphql-upload-ts';

const app = express();

export async function bootstrap(port: number) {
  const schema = await buildSchema({
    resolvers: [UserResolver, AddressResolver],
    emitSchemaFile: join(process.cwd(), 'src/api/graphql/schema.gql'),
    validate: true,
    container: Container,
  });

  const server = new ApolloServer({
    schema,
    includeStacktraceInErrorResponses: false,
    formatError: customFormatError,
  });

  await server.start();

  app.use(graphqlUploadExpress());

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ req }),
    }),
  );

  app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}/graphql`);
  });

  return server;
}

bootstrap(4000);
