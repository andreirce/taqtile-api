import jwt from 'jsonwebtoken';
import { TokenPayload } from '@domain/model';

export function generateToken(tokenPayload: TokenPayload): string {
  const { userId, email, rememberMe = false } = tokenPayload;
  const secretKey = process.env.JWT_SECRET;
  const expiresIn = rememberMe ? '7d' : '1h';
  return jwt.sign({ userId, email }, secretKey, { expiresIn });
}
