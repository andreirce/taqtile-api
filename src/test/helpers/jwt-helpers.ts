import { createAdminUser } from './user-helper';
import jwt from 'jsonwebtoken';

export async function generateTokenForTest(rememberMe = false): Promise<string> {
  const adminUser = await createAdminUser();

  const secretKey = process.env.JWT_SECRET;
  const expiresIn = rememberMe ? '7d' : '1h';
  return jwt.sign({ userId: adminUser.id, email: adminUser.email }, secretKey, { expiresIn });
}
