import { Service } from 'typedi';
import { Readable } from 'node:stream';
import { parse } from 'papaparse';

@Service()
export class CsvService {
  async parseCsv(readStream: Readable): Promise<unknown[]> {
    return new Promise((resolve, reject) => {
      let csvData = '';

      readStream.on('data', (chunk) => {
        csvData += chunk;
      });

      readStream.on('end', () => {
        parse(csvData.trim(), {
          header: true,
          skipEmptyLines: true,
          complete: (results) => resolve(results.data),
          error: (error: Error) => reject(error),
        });
      });

      readStream.on('error', (error) => reject(error));
    });
  }
}
