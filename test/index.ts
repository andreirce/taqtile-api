import { before, after } from 'mocha';
import { bootstrap } from '../src/server';
import { ApolloServer } from '@apollo/server';

let server: ApolloServer;

before(async () => {
  server = await bootstrap(4001);
});

after(async () => {
  await server.stop();
});
