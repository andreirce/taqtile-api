import axios from 'axios';
import { UserInput } from '../inputs/user-input';

export function createDefaultUser() {
  return {
    name: 'teste1',
    email: 'teste1@gmail.com',
    password: 'teste123',
  };
}

export async function createUserForTest(userData: UserInput, token: string | null) {
  const createUserMutation = `
    mutation CreateUser($data: UserInput!) {
      createUser(data: $data) {
        id
        name
        email
      }
    }
  `;

  const tokenAuthorization = token === null ? token : `bearer ${token}`;

  const response = await axios.post(
    'http://localhost:4001/graphql',
    {
      query: createUserMutation,
      variables: { data: userData },
    },
    {
      headers: {
        Authorization: tokenAuthorization,
      },
    },
  );

  return { data: response.data.data?.createUser, errors: response.data.errors };
}

export async function loginUserForTest(email: string, password: string, rememberMe: boolean) {
  const loginUserMutation = `
      mutation Login($data: LoginInput!) {
        login(data: $data) {
          user {
            name
            birthDate
            email
          }
          token
        }
      }
    `;

  const response = await axios.post('http://localhost:4001/graphql', {
    query: loginUserMutation,
    variables: { data: { email, password, rememberMe } },
  });

  return response.data;
}
