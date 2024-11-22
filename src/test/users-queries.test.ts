import { beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { prisma } from '@test';
import { generateTokenForTest, queryAllUsers } from './helpers';

describe('testing users query', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();

    const users = Array.from({ length: 10 }, (_, i) => ({
      name: `user ${i}`,
      email: `user${i}@gmail.com`,
      password: `password${i}`,
      birthDate: '2005-05-21T12:34:56.789Z',
    }));

    await prisma.user.createMany({ data: users });
  });

  it('should return the expected number of users when valid pagination parameters are provided', async () => {
    const token = await generateTokenForTest();
    const pageData = {
      limit: 10,
      page: 1,
    };

    const { data: response } = await queryAllUsers(pageData, token);

    expect(response.users).to.be.an('array');
    expect(response.users.length).to.be.equal(10);
    expect(response.moreAfter).to.be.equal(true);
    expect(response.moreBefore).to.be.equal(false);

    const filteredUsers = response.users.filter((user: { name: string }) => user.name !== 'admin');

    for (let i = 0; i < filteredUsers.length; i++) {
      const user = filteredUsers[i];

      expect(user.name).to.be.equal(`user ${i}`);
      expect(user.email).to.be.equal(`user${i}@gmail.com`);
      expect(user.birthDate).to.be.equal('2005-05-21T12:34:56.789Z');
      expect(user).to.have.property('address');
      expect(user.address.length).to.be.equal(0);
    }
  });

  it('should return validation error when an invalid number is provided for pagination', async () => {
    const token = await generateTokenForTest();
    const pageData = {
      limit: -10,
      page: -1,
    };

    const { errors: response } = await queryAllUsers(pageData, token);

    expect(response[0].extensions.invalidInputs[0]).to.be.equal('O valor deve ser maior que 0.');
    expect(response[0].extensions.invalidInputs[1]).to.be.equal('O valor deve ser maior que 0.');
    expect(response[0].code).to.be.equal(400);
  });

  it('should return no users if page exceeds available data', async () => {
    const token = await generateTokenForTest();
    const pageData = {
      limit: 20,
      page: 2,
    };

    const { data: response } = await queryAllUsers(pageData, token);

    expect(response.users).to.be.an('array');
    expect(response.users.length).to.be.equal(0);
    expect(response.moreAfter).to.be.equal(false);
    expect(response.moreBefore).to.be.equal(true);
  });

  it('should return default pagination when no pagination parameters are provided', async () => {
    const token = await generateTokenForTest();
    const pageData = {};

    const { data: response } = await queryAllUsers(pageData, token);

    expect(response.users).to.be.an('array');
    expect(response.users.length).to.be.equal(10);
    expect(response.moreAfter).to.be.equal(true);
    expect(response.moreBefore).to.be.equal(false);
  });

  it('should return an error when no token is provided.', async () => {
    const pageData = {};

    const { errors: response } = await queryAllUsers(pageData, null);

    expect(response[0].message).to.be.equal('O token não foi fornecido ou está mal formatado.');
    expect(response[0].code).to.be.equal(401);
  });
});
