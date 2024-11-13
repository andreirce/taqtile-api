import axios from 'axios';

export const defaultAddress = {
  streetNumber: 22,
  street: 'Rua teste',
  state: 'Bahia',
  neighborhood: 'bairro teste',
  complement: 'teste',
  city: 'Salvador',
  cep: '12345-678',
};

export async function createAddress(userId: string, token: string | null) {
  const addressMutation = `
    mutation CreateAddress($data: AddressInput!) {
        createAddress(data: $data) {
            id
            userId
            streetNumber
            street
            state
            neighborhood
            complement
            city
            cep
        }
    }
`;

  const tokenAuthorization = token === null ? token : `bearer ${token}`;

  const response = await axios.post(
    'http://localhost:4001/graphql',
    {
      query: addressMutation,
      variables: { data: { ...defaultAddress, userId } },
    },
    {
      headers: {
        Authorization: tokenAuthorization,
      },
    },
  );

  return { data: response.data.data?.createAddress, errors: response.data.errors };
}
