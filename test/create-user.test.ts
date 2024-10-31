import { describe, it } from 'mocha';
import { expect } from 'chai';
import { prisma } from './index';
import { createUserForTest } from '../src/utils/user';
import { generateTokenForTest } from '../test/helpers/jwt-helpers';
import { createDefaultUser } from './helpers/user-helper';

describe('User creation', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it('Verify whether the createUser mutation is able to create a user.', async () => {
    const newUser = createDefaultUser();
    const token = await generateTokenForTest();
    const { data: createUserResponse } = await createUserForTest(newUser, token);

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

  it('should return an error when trying to create a user without a token', async () => {
    const newUser = createDefaultUser();
    const { errors: errorsResponse } = await createUserForTest(newUser, null);

    expect(errorsResponse).to.be.an('array');
    expect(errorsResponse[0].message).to.be.equal('O token não foi fornecido ou está mal formatado.');
    expect(errorsResponse[0].code).to.be.equal(401);
  });

  it('should return an error when trying to create a user with an invalid token', async () => {
    const newUser = createDefaultUser();
    const { errors: errorsResponse } = await createUserForTest(newUser, '');

    expect(errorsResponse).to.be.an('array');
    expect(errorsResponse[0].message).to.be.equal('Acesso negado! Token inválido ou expirado.');
    expect(errorsResponse[0].code).to.be.equal(401);
  });
});
