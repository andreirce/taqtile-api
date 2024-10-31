import { prisma } from '../index';

export function createDefaultUser() {
  return {
    name: 'teste1',
    email: 'teste1@gmail.com',
    password: 'teste123',
  };
}

export async function createAdminUser() {
  const adminUser = {
    name: 'admin',
    email: 'admin@gmail.com',
    password: 'admin123',
  };

  return await prisma.user.create({ data: adminUser });
}
