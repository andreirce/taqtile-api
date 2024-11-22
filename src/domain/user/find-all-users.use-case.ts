import { Service } from 'typedi';
import { UserDbDataSource } from '@data/user/user.db.datasource';
import { UserDetailsModel, UsersPaginationModel } from '@domain/model';

@Service()
export class FindAllUsersUseCase {
  constructor(private readonly datasource: UserDbDataSource) {}

  async exec(input: UserDetailsModel): Promise<UsersPaginationModel> {
    return await this.datasource.findAll(input);
  }
}
