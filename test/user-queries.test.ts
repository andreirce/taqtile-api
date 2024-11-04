import { beforeEach, describe } from 'mocha';
import { prisma } from './index';
import { createAdminUser, createDefaultUser, createUserForTest, queryUserById } from './helpers/user-helper';
import { generateTokenForTest } from './helpers/jwt-helpers';
import { expect } from 'chai';

describe('Testing User Queries', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it('should allow an authenticated user to use the FindUserById query', async () => {
    const newUser = createDefaultUser();
    const token = await generateTokenForTest();
    const { data: response } = await createUserForTest(newUser, token);

    const { data: query } = await queryUserById(response.id, token);

    expect(query).to.have.property('id');
    expect(query).to.have.property('name');
    expect(query).to.have.property('email');
    expect(query).to.have.property('birthDate');

    expect(query.id).to.be.equal(response.id);
    expect(query.name).to.be.equal(response.name);
    expect(query.email).to.be.equal(response.email);
    expect(query.birthDate).to.be.equal(null);
  });

  it('should verify that an authenticated user tries to insert an invalid ID', async () => {
    const token = await generateTokenForTest();

    const { errors: response } = await queryUserById('1', token);

    expect(response[0].message).to.equal('Usuário não encontrado!');
    expect(response[0].code).to.equal(404);
  });

  it('should verify that an unauthenticated user tries to use the query', async () => {
    const newUser = await createAdminUser();

    const { errors: response } = await queryUserById(newUser.id, '');

    expect(response[0].message).to.equal('Acesso negado! Token inválido ou expirado.');
    expect(response[0].code).to.equal(401);
  });
});
