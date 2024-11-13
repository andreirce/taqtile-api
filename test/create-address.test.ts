import { beforeEach, describe, it } from 'mocha';
import { prisma } from './index';
import { generateTokenForTest } from './helpers/jwt-helpers';
import { createUserForTest, defaultUser } from './helpers/user-helper';
import { createAddress } from './helpers/address-helper';
import { expect } from 'chai';

describe('Address Creation', () => {
  beforeEach(async () => {
    await prisma.address.deleteMany();
    await prisma.user.deleteMany();
  });

  it('testando se retorna tudo corretamente', async () => {
    const token = await generateTokenForTest();
    const { data: user } = await createUserForTest(defaultUser, token);

    const { data: addressResponse } = await createAddress(user.id, token);

    expect(addressResponse).to.have.property('street');
  });
});
