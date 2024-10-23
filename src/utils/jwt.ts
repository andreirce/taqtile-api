import jwt from 'jsonwebtoken';

export function generateToken(userId: string, email: string): string {
  const secretKey = process.env.JWT_SECRET;
  return jwt.sign({ userId, email }, secretKey, { expiresIn: '1h' });
}
