import { CustomError } from './custom.error';

export class InvalidInputCsvError extends CustomError {
  constructor(message: string) {
    super(400, message);
  }
}
