import fs from 'node:fs';
import { prisma } from '@test';
import { describe, it } from 'mocha';
import { createUserCsvForTest } from './helpers/user-with-csv.helper';
import { generateTokenForTest } from './helpers';
import { expect } from 'chai';

describe('Create Users with CSV test', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it('should successfully create users when uploading a valid CSV file', async () => {
    const token = await generateTokenForTest();
    const file = fs.createReadStream('src/test/fixtures/users-example-csv.csv', 'utf-8');

    const { data: response } = await createUserCsvForTest(file, token);

    expect(response).to.be.equal('Usuários criados com sucesso!');
  });

  it('should return an error indicating that only CSV files are allowed.', async () => {
    const token = await generateTokenForTest();
    const invalidFile = fs.createReadStream('src/test/fixtures/invalid-file-example.txt', 'utf-8');

    const { errors: errorResponse } = await createUserCsvForTest(invalidFile, token);

    expect(errorResponse[0].message).to.be.equal('Somente arquivos CSV são permitidos!');
    expect(errorResponse[0].code).to.be.equal(400);
  });

  it('should return an authentication error when trying to upload without providing a token', async () => {
    const file = fs.createReadStream('src/test/fixtures/users-example-csv.csv', 'utf-8');
    const { errors: errorResponse } = await createUserCsvForTest(file, null);

    expect(errorResponse[0].message).to.be.equal('O token não foi fornecido ou está mal formatado.');
    expect(errorResponse[0].code).to.be.equal(401);
  });

  it('should return an error when required fields are missing in the CSV file', async () => {
    const token = await generateTokenForTest()
    const file = fs.createReadStream('src/test/fixtures/missing-fields-example.csv', 'utf-8');
    const { errors: errorResponse } = await createUserCsvForTest(file, token);

    expect(errorResponse[0].message).to.be.equal('Dados inválidos no CSV: nome, email e senha são obrigatórios.');
    expect(errorResponse[0].code).to.be.equal(400);
  });

  it('should return an error when trying to create a user already exists in the database', async () => {
    const token = await generateTokenForTest()

    const user = {
      name: 'User One',
      email: 'test1@example.com',
      password: 'password123',
    }

    await prisma.user.create({ data: user })

    const file = fs.createReadStream('src/test/fixtures/users-example-csv.csv', 'utf-8');
    const { errors: errorResponse } = await createUserCsvForTest(file, token);

    expect(errorResponse[0].message).to.be.equal('O usuário test1@example.com já está registrado!');
    expect(errorResponse[0].code).to.be.equal(409);
  });
});
