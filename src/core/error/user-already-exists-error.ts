import { CustomError } from './custom-error';

export class UserAlreadyExistsError extends CustomError {
  constructor() {
    super(409, 'Usuário já existe.');
  }
}
