import { CustomException } from './custom-exception';

export class LoginException extends CustomException {
  constructor() {
    super(401, 'email ou senha inválidos!');
  }
}
