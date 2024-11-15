import { CustomException } from '../../core/error/custom-exception';

export class UnauthorizedException extends CustomException {
  constructor(message: string) {
    super(401, message);
  }
}
