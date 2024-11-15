import { PrismaClient } from '@prisma/client';
import { UserInput } from '../../api/graphql/modules/user/input/user-input';
import { UserAlreadyExistsError } from '../../core/error/user-already-exists-error';
import { comparePassword, hashPassword } from '../../core/security/crypto/crypto';
import { LoginInput } from '../../api/graphql/modules/user/input/login-input';
import { generateToken } from '../../core/security/jwt/jwt';
import { LoginError } from '../../core/error/login-error';
import { UserNotFoundError } from '../../core/error/user-not-found-error';
import { UsersDetailsInput } from '../../api/graphql/modules/user/input/users-details-input';

const prisma = new PrismaClient();

export class UserService {
  static async findAllUsers(data: UsersDetailsInput) {
    let skip = 0;
    const limit = data?.limit ?? 10;
    const page = data?.page ?? 1;

    if (limit && page) {
      skip = limit * (page - 1);
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        birthDate: true,
        address: true,
      },
      skip,
      take: limit,
      orderBy: {
        name: 'asc',
      },
    });

    const totalUsers = await prisma.user.count();

    const moreBefore = skip > 0;
    const moreAfter = skip + users.length < totalUsers;

    return { users, moreAfter, moreBefore };
  }

  static async findUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { address: true },
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

  static async createUser(data: UserInput) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await hashPassword(data.password);
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      include: { address: true },
    });

    delete user.password;

    return user;
  }

  static async loginUser(data: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new LoginError();
    }

    const validPassword = await comparePassword(data.password, user.password);

    if (!validPassword) {
      throw new LoginError();
    }

    const token = generateToken({ userId: user.id, email: user.email, rememberMe: data.rememberMe });

    return { user, token };
  }
}
