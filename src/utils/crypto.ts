import { hash, compare } from 'bcrypt';

const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, saltRounds);
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return await compare(password, hashedPassword);
}
