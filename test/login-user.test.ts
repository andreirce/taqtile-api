import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import { prisma } from './index';
import { createUserForTest, loginUserForTest } from '../src/utils/user';
import jwt, { JwtPayload } from 'jsonwebtoken';

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
    const loginResponse = await loginUserForTest('teste1@gmail.com', 'teste123', false);

    expect(loginResponse.data.login).to.have.property('token');
    expect(loginResponse.data.login.user.email).to.equal('teste1@gmail.com');
  });

  it('Should not login with invalid email', async () => {
    const loginResponse = await loginUserForTest('wrongEmail@gmail.com', 'teste123', false);

    expect(loginResponse.errors).to.be.an('array');
    expect(loginResponse.errors[0].message).to.equal('email ou senha inválidos!');
    expect(loginResponse.errors[0].code).to.equal(401);
  });

  it('Should not login with invalid password', async () => {
    const loginResponse = await loginUserForTest('teste1@gmail.com', 'wrongPassword', false);

    expect(loginResponse.errors).to.be.an('array');
    expect(loginResponse.errors[0].message).to.equal('email ou senha inválidos!');
    expect(loginResponse.errors[0].code).to.equal(401);
  });

  it('Should not login with invalid email and password', async () => {
    const loginResponse = await loginUserForTest('wrongEmail@gmail.com', 'wrongPassword', false);

    expect(loginResponse.errors).to.be.an('array');
    expect(loginResponse.errors[0].message).to.equal('email ou senha inválidos!');
    expect(loginResponse.errors[0].code).to.equal(401);
  });

  it('Successful login with rememberMe and extended expiration token', async () => {
    const loginResponse = await loginUserForTest('teste1@gmail.com', 'teste123', true);

    expect(loginResponse.data.login).to.have.property('token');

    const token = loginResponse.data.login.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    expect(decodedToken).to.have.property('exp');

    const expirationTime = 7 * 24 * 60 * 60;
    const currentTime = Math.floor(Date.now() / 1000);

    expect(decodedToken.exp).to.be.greaterThan(currentTime + expirationTime - 0.001);
  });
});
