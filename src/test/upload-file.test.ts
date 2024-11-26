import fs from 'node:fs';
import { prisma } from '@test';
import { describe, it } from 'mocha';
import { uploadFileForTest } from './helpers/upload-file.helper';
import { generateTokenForTest } from './helpers';
import { expect } from 'chai';

describe('Upload file test', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it('should return a success message when uploading a valid CSV file', async () => {
    const token = await generateTokenForTest();
    const file = fs.createReadStream('src/test/fixtures/users-example-csv.csv', 'utf-8');

    const { data: response } = await uploadFileForTest(file, token);

    expect(response).to.be.equal('Arquivo processado com sucesso!');
  });

  it('should return an error indicating that only CSV files are allowed.', async () => {
    const token = await generateTokenForTest();
    const invalidFile = fs.createReadStream('src/test/fixtures/invalid-file-example.txt', 'utf-8');

    const { errors: errorResponse } = await uploadFileForTest(invalidFile, token);

    expect(errorResponse[0].message).to.be.equal('Somente arquivos CSV são permitidos!');
    expect(errorResponse[0].code).to.be.equal(400);
  });

  it('should return an authentication error when trying to upload without providing a token', async () => {
    const invalidFile = fs.createReadStream('src/test/fixtures/invalid-file-example.txt', 'utf-8');
    const { errors: errorResponse } = await uploadFileForTest(invalidFile, null);

    expect(errorResponse[0].message).to.be.equal('O token não foi fornecido ou está mal formatado.');
    expect(errorResponse[0].code).to.be.equal(401);
  });
});
