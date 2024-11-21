import { UserNotFoundError } from '@core/error';
import { UserDbDataSource } from '@data/user/user-db-datasource';
import { Service } from 'typedi';

@Service()
export class findUserUseCase {
  constructor(private readonly datasource: UserDbDataSource) {}

  async exec(input: string) {
    const user = await this.datasource.findById(input);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
