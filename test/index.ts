import { before, after } from 'mocha';
import { bootstrap } from '../src/server';
import { ApolloServer } from '@apollo/server';
import dotenv from 'dotenv';

let server: ApolloServer;

dotenv.config({ path: '../.env.test' });

before(async () => {
  server = await bootstrap(4001);
});

after(async () => {
  await server.stop();
});
