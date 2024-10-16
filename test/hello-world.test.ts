import { describe, it } from 'mocha';
import { expect } from 'chai';
import axios from 'axios';

describe('Hello World suite', () => {
  it('Test if Hello World query returns a "Hello World string"', async () => {
    const response = await axios.post('http://localhost:4001/graphql', {
      query: `
        query HelloWorld {
          HelloWorld
        }
      `,
    });

    expect(response.data.data.HelloWorld).to.equal('Hello, World!');
  });
});
