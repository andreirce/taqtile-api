import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import { UserModel } from '../models/user-model';
import { CreateUserInput } from '../inputs/user-input';

const prisma = new PrismaClient();

@Resolver()
export class UserResolver {
  @Query(() => [UserModel])
  async users() {
    return await prisma.user.findMany();
  }

  @Mutation(() => UserModel)
  async createUser(@Arg('data', () => CreateUserInput) data: CreateUserInput) {
    return await prisma.user.create({ data });
  }
}
