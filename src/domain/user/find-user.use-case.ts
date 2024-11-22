import { UserNotFoundError } from '@core/error';
import { UserDbDataSource } from '@data/user/user.db.datasource';
import { UserWithAddressModel } from '@domain/model';
import { Service } from 'typedi';

@Service()
export class FindUserUseCase {
  constructor(private readonly datasource: UserDbDataSource) {}

  async exec(input: string): Promise<UserWithAddressModel> {
    const user = await this.datasource.findById(input);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
