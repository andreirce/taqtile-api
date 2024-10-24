import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import { prisma } from './index';
import { createUserForTest, loginUserForTest } from '../src/utils/user';

describe('Login Test', () => {
  before(async () => {
    await prisma.user.deleteMany();

    const newUser = {
      name: 'teste1',
      email: 'teste1@gmail.com',
      password: 'teste123',
    };

    const createUserResponse = await createUserForTest(newUser);

    expect(createUserResponse).to.have.property('id');
    expect(createUserResponse).to.have.property('name');
    expect(createUserResponse).to.have.property('email');
  });

  it('Should successfully login with valid credentials', async () => {
    const loginResponse = await loginUserForTest('teste1@gmail.com', 'teste123');

    expect(loginResponse.data.login).to.have.property('token');
    expect(loginResponse.data.login.user.email).to.equal('teste1@gmail.com');
  });

  it('Should not login with invalid email', async () => {
    const loginResponse = await loginUserForTest('wrongEmail@gmail.com', 'teste123');

    expect(loginResponse.errors).to.be.an('array');
    expect(loginResponse.errors[0].message).to.equal('email ou senha inválidos!');
    expect(loginResponse.errors[0].code).to.equal(401);
  });

  it('Should not login with invalid password', async () => {
    const loginResponse = await loginUserForTest('teste1@gmail.com', 'wrongPassword');

    expect(loginResponse.errors).to.be.an('array');
    expect(loginResponse.errors[0].message).to.equal('email ou senha inválidos!');
    expect(loginResponse.errors[0].code).to.equal(401);
  });

  it('Should not login with invalid email and password', async () => {
    const loginResponse = await loginUserForTest('wrongEmail@gmail.com', 'wrongPassword');

    expect(loginResponse.errors).to.be.an('array');
    expect(loginResponse.errors[0].message).to.equal('email ou senha inválidos!');
    expect(loginResponse.errors[0].code).to.equal(401);
  });
});
