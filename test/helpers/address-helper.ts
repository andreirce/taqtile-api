import axios from 'axios';

const defaultAddress = {
  streetNumber: 22,
  street: 'Rua teste',
  state: 'Bahia',
  neighborhood: 'bairro teste',
  complement: 'teste',
  city: 'Salvador',
  cep: '12345-678',
};

export async function createAddress(userId: string) {
  const addressMutation = `
    mutation CreateAddress($data: AddressInput!) {
        createAddress(data: $data) {
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

  const response = await axios.post('http://localhost:4001/graphql', {
    query: addressMutation,
    variables: { data: { ...defaultAddress, userId } },
  });

  return { data: response.data.data?.createAddress, errors: response.data.errors };
}
