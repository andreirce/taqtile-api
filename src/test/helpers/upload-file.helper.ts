import axios from 'axios';
import { ReadStream } from 'node:fs';
import FormData from 'form-data';

export async function uploadFileForTest(file: ReadStream, token: string | null) {
  const uploadFileMutation = `
    mutation createUsersWithCsv($file: Upload!) {
      uploadCsv(file: $file)
    }
  `;

  const tokenAuthorization = token === null ? token : `bearer ${token}`;

  const formData = new FormData();
  formData.append(
    'operations',
    JSON.stringify({
      query: uploadFileMutation,
      variables: { file: null },
    }),
  );

  formData.append(
    'map',
    JSON.stringify({
      0: ['variables.file'],
    }),
  );

  formData.append('0', file);

  const headers = {
    ...formData.getHeaders(),
    Authorization: tokenAuthorization,
  };

  const response = await axios.post('http://localhost:4001/graphql', formData, { headers });

  return { data: response.data.data?.createUsersWithCsv, errors: response.data.errors };
}
