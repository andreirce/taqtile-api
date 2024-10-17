import { before, after } from 'mocha';
import { bootstrap } from '../src/server';
import { ApolloServer } from '@apollo/server';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

let server: ApolloServer;
export const prisma = new PrismaClient();

dotenv.config({ path: '../.env.test' });

before(async () => {
  server = await bootstrap(4001);
  await prisma.user.deleteMany();
});

after(async () => {
  await server.stop();
  await prisma.$disconnect();
});
