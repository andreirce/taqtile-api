import { CustomError } from './custom.error';

export class UserAlreadyExistsError extends CustomError {
  constructor(message?: string) {
    super(409, message ? message : 'Usuário já existe.');
  }
}
