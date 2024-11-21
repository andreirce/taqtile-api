import { describe, it, before } from 'mocha';
import { assert, expect } from 'chai';
import { prisma } from '@test';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { hashPassword } from '@core/security/crypto/crypto';
import { loginUserForTest } from '@test/helpers';



describe('Login Test', () => {
  before(async () => {
    await prisma.user.deleteMany();

    const hashedPassword = await hashPassword('teste123');

    const newUser = {
      name: 'teste1',
      email: 'teste1@gmail.com',
      password: hashedPassword,
    };

    await prisma.user.create({ data: newUser });
  });

  it('Should successfully login with valid credentials', async () => {
    const loginResponse = await loginUserForTest('teste1@gmail.com', 'teste123', false);

    expect(loginResponse.data.login).to.have.property('token');

    const token = loginResponse.data.login.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    expect(decodedToken).to.have.property('email', 'teste1@gmail.com');
    expect(loginResponse.data.login.user.email).to.equal('teste1@gmail.com');
    expect(loginResponse.data.login.user.name).to.equal('teste1');
    expect(loginResponse.data.login.user.birthDate).to.equal(null);
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

    const expirationTime = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;
    const marginError = 1;

    assert.approximately(decodedToken.exp, expirationTime, marginError);
  });
});
