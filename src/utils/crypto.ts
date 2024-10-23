import { hash, compare } from 'bcrypt';

const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await hash(password, saltRounds);
  return hashedPassword;
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  const comparePassword = await compare(password, hashedPassword);
  return comparePassword;
}
