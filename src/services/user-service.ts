import { PrismaClient } from '@prisma/client';
import { CreateUserInput } from '../inputs/user-input';

const prisma = new PrismaClient();

export class UserService {
  static async findAllUsers() {
    return await prisma.user.findMany();
  }

  static async createUser(data: CreateUserInput) {
    return await prisma.user.create({ data });
  }
}
