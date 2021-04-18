import authReducer from '../authReducer';
import actionTypes from '../../actionTypes';

const {
  createActionType,
  SUCCESS,
  ERROR,
  SIGN_IN,
  SIGN_UP,
  GET_ACCOUNT,
  SIGN_OUT,
} = actionTypes;

describe('Authentication reducers tests', () => {
  const initialState = {
    accountId: '',
    isAuthenticated: false,
    accountData: {
      username: '',
      profileImage: '',
      email: '',
      country: '',
      userLocation: {
        lat: '',
        lng: '',
      },
    },
  };
  it('Should return initial state', () => {
    expect(authReducer(initialState, {})).toEqual(initialState);
  });

  it('Should return default switch case', () => {
    expect(authReducer(initialState, { type: 'Empty' })).toEqual(initialState);
  });

  it('Tests signIn', () => {
    expect(authReducer(initialState, {
      type: createActionType(SIGN_IN, SUCCESS),
      payload: { accountId: '1' },
    })).toEqual({
      ...initialState,
      accountId: '1',
      isAuthenticated: true,
    });

    expect(authReducer(initialState, {
      type: createActionType(SIGN_IN, ERROR),
    })).toEqual({
      ...initialState,
      accountId: '',
    });
  });
  it('Tests signUp', () => {
    expect(authReducer(initialState, {
      type: createActionType(SIGN_UP, SUCCESS),
      payload: { accountId: '1' },
    })).toEqual({
      ...initialState,
      accountId: '1',
      isAuthenticated: true,
    });

    expect(authReducer(initialState, {
      type: createActionType(SIGN_UP, ERROR),
    })).toEqual({
      ...initialState,
      accountId: '',
    });
  });

  it('Tests getAccount', () => {
    expect(authReducer(initialState, {
      type: createActionType(GET_ACCOUNT, SUCCESS),
      payload: {
        username: 'test',
        email: 'test@gmail.com',
        profileImage: 'image',
        country: 'Romania',
        userLocation: {
          lat: '23.12',
          lng: '34.15',
        },
      },
    })).toEqual({
      ...initialState,
      accountData: {
        username: 'test',
        email: 'test@gmail.com',
        profileImage: 'image',
        country: 'Romania',
        userLocation: {
          lat: '23.12',
          lng: '34.15',
        },
      },
    });

    expect(authReducer(initialState, {
      type: createActionType(GET_ACCOUNT, ERROR),
    })).toEqual({
      ...initialState,
      accountData: {
        username: '',
        profileImage: '',
        email: '',
        country: '',
        userLocation: {
          lat: '',
          lng: '',
        },
      },
    });
  });

  it('Tests signOut', () => {
    expect(authReducer(initialState, {
      type: SIGN_OUT,
    })).toEqual({
      ...initialState,
      isAuthenticated: false,
      accountId: '',
      accountData: {
        username: '',
        profileImage: '',
        email: '',
        country: '',
        userLocation: {
          lat: '',
          lng: '',
        },
      },
    });
  });
});
