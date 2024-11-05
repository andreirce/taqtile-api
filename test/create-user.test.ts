import { describe, it } from 'mocha';
import { expect } from 'chai';
import { prisma } from './index';
import { createUserForTest } from '../src/utils/user';

describe('User creation', () => {
  it('Verify whether the createUser mutation is able to create a user.', async () => {
    const newUser = {
      name: 'teste1',
      email: 'teste1@gmail.com',
      password: 'teste123',
    };

    const createUserResponse = await createUserForTest(newUser);

    expect(createUserResponse).to.have.property('id');
    expect(createUserResponse).to.have.property('name');
    expect(createUserResponse).to.have.property('email');

    const user = await prisma.user.findUnique({
      where: {
        id: createUserResponse.id,
      },
    });

    expect(user).to.be.not.equal(null);
    expect(user?.name).to.be.equal(newUser.name);
    expect(user?.email).to.be.equal(newUser.email);
    expect(user?.birthDate).to.be.equal(null);
    expect(user?.id).to.be.equal(createUserResponse.id);
  });
});
