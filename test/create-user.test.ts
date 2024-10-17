import { describe, it } from 'mocha';
import { expect } from 'chai';
import axios from 'axios';
import { prisma } from './index';

describe('User creation', () => {
  it('Verify whether the createUser mutation is able to create a user.', async () => {
    const newUser = {
      name: 'teste1',
      email: 'teste1@gmail.com',
      password: 'teste123',
    };

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
      variables: { data: newUser },
    });

    expect(response.data.data.createUser).to.have.property('id');
    expect(response.data.data.createUser).to.have.property('name');
    expect(response.data.data.createUser).to.have.property('email');

    const user = await prisma.user.findUnique({
      where: {
        id: response.data.data.createUser.id,
      },
    });

    expect(user).to.be.not.equal(null);
    expect(user?.name).to.be.equal(newUser.name);
    expect(user?.email).to.be.equal(newUser.email);
    expect(user?.birthDate).to.be.equal(null);
    expect(user?.id).to.be.equal(response.data.data.createUser.id);
  });
});
