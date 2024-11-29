import { CsvService } from '@core/upload-files/csv.service';
import { Service } from 'typedi';
import { FileUpload } from 'graphql-upload-ts';
import { InvalidFileError } from '@core/error/invalid-file-upload.error';
import { UserInputModel } from '@domain/model';
import { InvalidInputCsvError } from '@core/error/invalid-input-csv.error';
import { hashPassword } from '@core/security/crypto/crypto';
import { UserDbDataSource } from '@data/user/user.db.datasource';
import { UserAlreadyExistsError } from '@core/error';

@Service()
export class ProcessCsvUseCase {
  constructor(
    private readonly csvService: CsvService,
    private readonly datasource: UserDbDataSource,
  ) {}

  async exec(file: FileUpload) {
    if (file.mimetype !== 'text/csv') {
      throw new InvalidFileError('Somente arquivos CSV são permitidos!');
    }

    const readStream = file.createReadStream();
    const csvData = await this.csvService.parseCsv(readStream) as UserInputModel[];

    const usersToCreate = await Promise.all(csvData.map((row) => this.processUserData(row)));

    await this.datasource.createMany(usersToCreate);
  }

  private async processUserData(row: UserInputModel) {
    const { name, email, password, birthDate } = row;

    if (!name || !email || !password) {
      throw new InvalidInputCsvError(`Dados inválidos no CSV: nome, email e senha são obrigatórios.`);
    }

    const existingUser = await this.datasource.findByEmail(email);

    if (existingUser) {
      throw new UserAlreadyExistsError(`O usuário ${email} já está registrado!`);
    }

    return {
      name,
      email,
      password: await hashPassword(password),
      birthDate: birthDate ? new Date(birthDate) : null,
    };
  }
}
