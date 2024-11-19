import axios from 'axios';
import { prisma } from '../index';
import { UserInput } from '../../api/graphql/modules/user/input/user-input';
import { UserDetailsInput } from '../../api/graphql/modules/user/input/users-details-input';

export const defaultUser = {
  name: 'teste1',
  email: 'teste1@gmail.com',
  password: 'teste123',
};

export async function createAdminUser() {
  const adminUser = {
    name: 'admin',
    email: 'admin@gmail.com',
    password: 'admin123',
  };

  return await prisma.user.create({ data: adminUser });
}

export async function createUserInDb(userData: UserInput) {
  return await prisma.user.create({ data: userData, include: { address: true } });
}

export async function createUserForTest(userData: UserInput, token: string | null) {
  const createUserMutation = `
      mutation CreateUser($data: UserInput!) {
        createUser(data: $data) {
          id
          name
          email
          address {
            city
            cep
            complement
            id
            neighborhood
            state
            street
            streetNumber
            userId
          }
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

export async function queryUserById(id: string, token: string | null) {
  const query = `
  query User($id: String!) {
  user(id: $id) {
    id
    name
    email
    birthDate
     address {
        city
        cep
        complement
        id
        neighborhood
        state
        street
        streetNumber
        userId
     }
  }
}
  `;
  const tokenAuthorization = token === null ? token : `bearer ${token}`;

  const response = await axios.post(
    'http://localhost:4001/graphql',
    {
      query: query,
      variables: { id },
    },
    {
      headers: {
        Authorization: tokenAuthorization,
      },
    },
  );

  return { data: response.data.data?.user, errors: response.data.errors };
}

export async function queryAllUsers(pageData: UserDetailsInput, token: string | null) {
  const query = `
  query Query($data: UsersDetailsInput) {
    users(data: $data) {
      users {
        id
        name
        email
        birthDate
        address {
        city
        cep
        complement
        id
        neighborhood
        state
        street
        streetNumber
        userId
     }
      }
      moreAfter
      moreBefore
    }
  }
`;

  const tokenAuthorization = token === null ? token : `bearer ${token}`;

  const response = await axios.post(
    'http://localhost:4001/graphql',
    {
      query: query,
      variables: { data: { page: pageData.page, limit: pageData.limit } },
    },
    {
      headers: {
        Authorization: tokenAuthorization,
      },
    },
  );

  return { data: response.data.data?.users, errors: response.data.errors };
}
