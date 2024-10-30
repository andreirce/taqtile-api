import jwt from 'jsonwebtoken';
import { TokenPayload } from '../interfaces/token-payload-interface';
import { createAdminUser } from './user';

export function generateToken(tokenPayload: TokenPayload): string {
  const { userId, email, rememberMe = false } = tokenPayload;
  const secretKey = process.env.JWT_SECRET;
  const expiresIn = rememberMe ? '7d' : '1h';
  return jwt.sign({ userId, email }, secretKey, { expiresIn });
}

export async function generateTokenForTest(rememberMe = false): Promise<string> {
  const adminUser = await createAdminUser();

  const secretKey = process.env.JWT_SECRET;
  const expiresIn = rememberMe ? '7d' : '1h';
  return jwt.sign({ userId: adminUser.id, email: adminUser.email }, secretKey, { expiresIn });
}
