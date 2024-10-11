import { hash } from 'bcrypt';

const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await hash(password, saltRounds);
  return hashedPassword;
}
