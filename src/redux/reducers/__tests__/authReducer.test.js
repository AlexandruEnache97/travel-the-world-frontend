import authReducer from '../authReducer';
import actionTypes from '../../actionTypes';

const {
  SIGN_IN,
  SIGN_UP,
} = actionTypes;

describe('Authentication reducers tests', () => {
  const initialState = {
    accountId: '',
    accountData: {
      username: '',
      email: '',
      password: '',
      name: '',
      lastname: '',
    },
  };
  it('Should return initial state', () => {
    expect(authReducer(initialState, {})).toEqual(initialState);
  });

  it('Should return default switch case', () => {
    expect(authReducer(initialState, { type: 'Empty' })).toEqual(initialState);
  });

  it('Should return accountId on signIn', () => {
    expect(authReducer(initialState, {
      type: SIGN_IN,
      payload: { accountId: '1' },
    })).toEqual({
      ...initialState,
      accountId: '1',
    });
  });
  it('Should signUp', () => {
    expect(authReducer(initialState, {
      type: SIGN_UP,
    })).toEqual({
      ...initialState,
    });
  });
});
