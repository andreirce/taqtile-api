import { Service } from 'typedi';
import { UserDbDataSource } from '../../data/user/user-db-datasource';
import { UserInputModel } from '../model/user-model';
import { UserAlreadyExistsError } from '../../core/error/user-already-exists-error';
import { hashPassword } from '../../core/security/crypto/crypto';

@Service()
export class CreateUserUseCase {
  constructor(private readonly datasource: UserDbDataSource) {}

  async exec(input: UserInputModel) {
    const existingUser = await this.datasource.findByEmail(input.email);

    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await hashPassword(input.password);

    const user = await this.datasource.create({
      ...input,
      password: hashedPassword,
    });

    return user;
  }
}
