import { CustomError } from './custom.error';

export class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(401, message);
  }
}
