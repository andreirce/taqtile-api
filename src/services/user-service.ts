import { PrismaClient } from '@prisma/client';
import { CreateUserInput } from '../inputs/user-input';

const prisma = new PrismaClient();

export class UserService {
  static async findAllUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        birthDate: true,
      },
    });
  }

  static async createUser(data: CreateUserInput) {
    const user = await prisma.user.create({ data });

    delete user.password;

    return user;
  }
}
