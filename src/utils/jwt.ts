import jwt from 'jsonwebtoken';

export function generateToken(userId: string, email: string, rememberMe = false): string {
  const secretKey = process.env.JWT_SECRET;
  const expiresIn = rememberMe ? '7d' : '1h';
  return jwt.sign({ userId, email }, secretKey, { expiresIn });
}
