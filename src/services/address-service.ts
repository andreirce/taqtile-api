import { PrismaClient } from '@prisma/client';
import { AddressInput } from '../inputs/address-input';
import { UserNotFoundException } from '../exceptions/user-not-found-exception';

const prisma = new PrismaClient();

export class AddressService {
  static async createAddress(data: AddressInput) {
    return await prisma.address.create({ data });
  }

  static async findByUserId(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new UserNotFoundException();
    }

    return await prisma.address.findMany({ where: { userId } });
  }
}
