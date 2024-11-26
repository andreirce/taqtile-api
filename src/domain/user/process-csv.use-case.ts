import { CsvService } from '@core/upload-files/csv.service';
import { Service } from 'typedi';
import { FileUpload } from 'graphql-upload-ts';
import { invalidFileError } from '@core/error/invalid-file-upload.error';

@Service()
export class ProcessCsvUseCase {
  constructor(private readonly csvService: CsvService) {}

  async exec(file: FileUpload) {
    if (file.mimetype !== 'text/csv') {
      throw new invalidFileError('Somente arquivos CSV são permitidos!');
    }

    const readStream = file.createReadStream();
    return this.csvService.parseCsv(readStream);
  }
}
