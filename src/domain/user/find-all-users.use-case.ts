import { Service } from 'typedi';
import { UserDetailsInput } from '../../api/graphql/modules/user/input/users-details-input';
import { UserDbDataSource } from '../../data/user/user-db-datasource';

@Service()
export class FindAllUsersUseCase {
  constructor(private readonly datasource: UserDbDataSource) {}

  async exec(input: UserDetailsInput) {
    return await this.datasource.findAll(input);
  }
}
