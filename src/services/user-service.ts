import { PrismaClient } from '@prisma/client';
import { UserInput } from '../inputs/user-input';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists-exception';
import { comparePassword, hashPassword } from '../utils/crypto';
import { LoginInput } from '../inputs/login-input';
import { generateToken } from '../utils/jwt';
import { LoginException } from '../exceptions/login-exception';
import { UserNotFoundException } from '../exceptions/user-not-found-exception';

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

  static async findUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  static async createUser(data: UserInput) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new UserAlreadyExistsException();
    }

    const hashedPassword = await hashPassword(data.password);
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    delete user.password;

    return user;
  }

  static async loginUser(data: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new LoginException();
    }

    const validPassword = await comparePassword(data.password, user.password);

    if (!validPassword) {
      throw new LoginException();
    }

    const token = generateToken({ userId: user.id, email: user.email, rememberMe: data.rememberMe });

    return { user, token };
  }
}
