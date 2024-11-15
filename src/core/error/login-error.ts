import { CustomError } from './custom-error';

export class LoginError extends CustomError {
  constructor() {
    super(401, 'email ou senha inválidos!');
  }
}
