import axios from 'axios';
import { UserInput } from '../inputs/user-input';

export async function createUserForTest(userData: UserInput) {
  const createUserMutation = `
    mutation CreateUser($data: UserInput!) {
      createUser(data: $data) {
        id
        name
        email
      }
    }
  `;

  const response = await axios.post('http://localhost:4001/graphql', {
    query: createUserMutation,
    variables: { data: userData },
  });

  return response.data.data.createUser;
}

export async function loginUserForTest(email: string, password: string, rememberMe: boolean) {
  const loginUserMutation = `
      mutation Login($data: LoginInput!) {
        login(data: $data) {
          user {
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
