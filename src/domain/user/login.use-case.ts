import { Service } from 'typedi';
import { UserDbDataSource } from '../../data/user/user-db-datasource';
import { LoginInputModel } from '../model/login-model';
import { LoginError } from '../../core/error/login-error';
import { comparePassword } from '../../core/security/crypto/crypto';
import { generateToken } from '../../core/security/jwt/jwt';

@Service()
export class LoginUseCase {
  constructor(private readonly datasource: UserDbDataSource) {}

  async exec(input: LoginInputModel) {
    const user = await this.datasource.findByEmail(input.email);

    if (!user) {
      throw new LoginError();
    }

    const validPassword = await comparePassword(input.password, user.password);

    if (!validPassword) {
      throw new LoginError();
    }

    const token = generateToken({ userId: user.id, email: user.email, rememberMe: input.rememberMe });

    return { user, token };
  }
}
