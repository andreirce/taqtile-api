import { Service } from 'typedi';
import { UserDbDataSource } from '../../data/user/user-db-datasource';
import { UserDetailsModel } from '../model/user-model';

@Service()
export class FindAllUsersUseCase {
  constructor(private readonly datasource: UserDbDataSource) {}

  async exec(input: UserDetailsModel) {
    return await this.datasource.findAll(input);
  }
}
