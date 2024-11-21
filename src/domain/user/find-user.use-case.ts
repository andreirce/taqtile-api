import { Service } from 'typedi';
import { UserDbDataSource } from '../../data/user/user-db-datasource';
import { UserNotFoundError } from '../../core/error/user-not-found-error';

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
