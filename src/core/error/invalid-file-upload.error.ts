import { CustomError } from './custom.error';

export class invalidFileError extends CustomError {
  constructor(message: string) {
    super(400, message);
  }
}
