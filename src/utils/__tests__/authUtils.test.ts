import axios from 'axios';
import { deleteToken, setToken } from '../authUtils';

jest.mock('axios');

describe('AuthUtils tests', () => {
  it('Should save token to headers', () => {
    setToken('token');
    expect(axios.defaults.headers.common.authorization).toEqual('token');
  });

  it('Should remove token from headers', () => {
    setToken('token');
    deleteToken();
    expect(axios.defaults.headers.common.authorization).toBeFalsy();
  });
});
