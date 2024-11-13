import { describe, it } from 'mocha';
import { expect } from 'chai';
import { prisma } from './index';
import { generateTokenForTest } from '../test/helpers/jwt-helpers';
import { createUserForTest, defaultUser } from './helpers/user-helper';
import { createAddress } from './helpers/address-helper';

describe('User creation', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it('Verify whether the createUser mutation is able to create a user.', async () => {
    const token = await generateTokenForTest();
    const { data: createUserResponse } = await createUserForTest(defaultUser, token);
    const { data: addressResponse } = await createAddress(createUserResponse.id, token);

    expect(createUserResponse).to.have.property('id');
    expect(createUserResponse).to.have.property('name');
    expect(createUserResponse).to.have.property('email');
    expect(createUserResponse).to.have.property('address');

    const user = await prisma.user.findUnique({
      where: {
        id: createUserResponse.id,
      },
      include: {
        address: true,
      },
    });

    expect(user).to.be.not.equal(null);
    expect(user.address).to.be.an('array');
    expect(user.address.length).to.be.equal(1);
    expect(user.address[0]).to.include({
      id: addressResponse.id,
      cep: addressResponse.cep,
      street: addressResponse.street,
      streetNumber: addressResponse.streetNumber,
      state: addressResponse.state,
      city: addressResponse.city,
      userId: addressResponse.userId,
      neighborhood: addressResponse.neighborhood,
      complement: addressResponse.complement,
    });

    expect(user.name).to.be.equal(createUserResponse.name);
    expect(user.email).to.be.equal(createUserResponse.email);
    expect(user.birthDate).to.be.equal(null);
    expect(user.id).to.be.equal(createUserResponse.id);
  });

  it('should allow a user to create multiple addresses', async () => {
    const token = await generateTokenForTest();
    const { data: user } = await createUserForTest(defaultUser, token);

    const address1 = await createAddress(user.id, token);
    const address2 = await createAddress(user.id, token);

    expect(address1.data).to.have.property('userId', user.id);
    expect(address2.data).to.have.property('userId', user.id);
  });

  it('should return an error when trying to create a user without a token', async () => {
    const { errors: errorsResponse } = await createUserForTest(defaultUser, null);

    expect(errorsResponse).to.be.an('array');
    expect(errorsResponse[0].message).to.be.equal('O token não foi fornecido ou está mal formatado.');
    expect(errorsResponse[0].code).to.be.equal(401);
  });

  it('should return an error when trying to create a user with an invalid token', async () => {
    const { errors: errorsResponse } = await createUserForTest(defaultUser, '');

    expect(errorsResponse).to.be.an('array');
    expect(errorsResponse[0].message).to.be.equal('Acesso negado! Token inválido ou expirado.');
    expect(errorsResponse[0].code).to.be.equal(401);
  });
});
