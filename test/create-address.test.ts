import { beforeEach, describe, it } from 'mocha';
import { prisma } from './index';
import { generateTokenForTest } from './helpers/jwt-helpers';
import { createUserForTest, createUserInDb, defaultUser } from './helpers/user-helper';
import { createAddress, defaultAddress } from './helpers/address-helper';
import { expect } from 'chai';

describe('Address Creation', () => {
  beforeEach(async () => {
    await prisma.address.deleteMany();
    await prisma.user.deleteMany();
  });

  it('should return all the correct fields when creating an address', async () => {
    const token = await generateTokenForTest();
    const user = await createUserInDb(defaultUser);

    const { data: addressResponse } = await createAddress(user.id, token);

    expect(addressResponse).to.have.property('id');
    expect(addressResponse).to.have.property('userId', user.id);
    expect(addressResponse).to.have.property('streetNumber', defaultAddress.streetNumber);
    expect(addressResponse).to.have.property('street', defaultAddress.street);
    expect(addressResponse).to.have.property('state', defaultAddress.state);
    expect(addressResponse).to.have.property('neighborhood', defaultAddress.neighborhood);
    expect(addressResponse).to.have.property('complement', defaultAddress.complement);
    expect(addressResponse).to.have.property('city', defaultAddress.city);
    expect(addressResponse).to.have.property('cep', defaultAddress.cep);
  });

  it('should return an error if the token is not provided', async () => {
    const token = await generateTokenForTest();
    const { data: user } = await createUserForTest(defaultUser, token);

    const { errors: errorResponse } = await createAddress(user.id, null);

    expect(errorResponse).to.be.an('array');
    expect(errorResponse[0].message).to.be.equal('O token não foi fornecido ou está mal formatado.');
    expect(errorResponse[0].code).to.be.equal(401);
  });

  it('should return an error if userId is not provided', async () => {
    const token = await generateTokenForTest();

    const { errors: errorResponse } = await createAddress('', token);

    expect(errorResponse).to.be.an('array');
    expect(errorResponse[0].code).to.be.equal(400);
    expect(errorResponse[0].extensions.invalidInputs[0]).to.be.equal('O campo de id é obrigatório!');
  });
});
