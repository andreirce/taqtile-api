import { AddressInput } from '../../api/graphql/modules/address/input/address-input';
import { UserNotFoundError } from '../../core/error/user-not-found-error';
import { dbClient } from '../../data/db/config/db-client';

export class AddressService {
  static async createAddress(data: AddressInput) {
    return await dbClient.address.create({ data });
  }

  static async findByUserId(userId: string) {
    const user = await dbClient.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new UserNotFoundError();
    }

    return await dbClient.address.findMany({ where: { userId } });
  }
}
