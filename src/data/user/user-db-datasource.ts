import { Service } from 'typedi';
import { dbClient } from '@data/db/config/db-client';
import { UserDetailsModel, UserInputModel } from '@domain/model';

@Service()
export class UserDbDataSource {
  create(data: UserInputModel) {
    return dbClient.user.create({ data, include: { address: true } });
  }

  findById(id: string) {
    return dbClient.user.findUnique({ where: { id }, include: { address: true } });
  }

  findByEmail(email: string) {
    return dbClient.user.findUnique({ where: { email }, include: { address: true } });
  }

  async findAll(data: UserDetailsModel) {
    let skip = 0;
    const limit = data?.limit ?? 10;
    const page = data?.page ?? 1;

    if (limit && page) {
      skip = limit * (page - 1);
    }

    const users = await dbClient.user.findMany({
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

    const totalUsers = await dbClient.user.count();

    const moreBefore = skip > 0;
    const moreAfter = skip + users.length < totalUsers;

    return { users, moreAfter, moreBefore };
  }
}
