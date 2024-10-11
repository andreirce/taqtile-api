import { hash } from 'bcrypt';

export class PasswordService {
  private static saltRounds = 10;

  static async hashPassword(password: string): Promise<string> {
    const hashedPassword = await hash(password, this.saltRounds);
    return hashedPassword;
  }
}
