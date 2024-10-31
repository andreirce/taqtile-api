import { prisma } from '../index';

export async function createAdminUser() {
  const adminUser = {
    name: 'admin',
    email: 'admin@gmail.com',
    password: 'admin123',
  };

  return await prisma.user.create({ data: adminUser });
}
