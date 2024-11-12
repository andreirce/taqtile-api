import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedDb() {
  try {
    await prisma.user.deleteMany();
    const users = Array.from({ length: 20 }, (_, i) => ({
      name: `user ${i}`,
      email: `user${i}@gmail.com`,
      password: `password${i}`,
      birthDate: '2005-05-21T12:34:56.789Z',
    }));

    await prisma.user.createMany({ data: users });

    console.log('seeding successfully');
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDb();
