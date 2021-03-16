import actionTypes from '../actionTypes';

const {
  createActionType,
  SUCCESS,
  ERROR,
  SIGN_IN,
  SIGN_UP,
  GET_ACCOUNT,
  SIGN_OUT,
} = actionTypes;

const initialState = {
  accountId: '',
  isAuthenticated: false,
  accountData: {
    username: '',
    email: '',
    country: '',
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case createActionType(SIGN_IN, SUCCESS):
    case createActionType(SIGN_UP, SUCCESS):
      return {
        ...state,
        accountId: action.payload.accountId,
        isAuthenticated: true,
      };
    case createActionType(SIGN_IN, ERROR):
    case createActionType(SIGN_UP, ERROR):
      return {
        ...state,
        accountId: '',
      };
    case createActionType(GET_ACCOUNT, SUCCESS):
      return {
        ...state,
        accountData: {
          username: action.payload.username,
          email: action.payload.email,
          country: action.payload.country,
        },
      };
    case createActionType(GET_ACCOUNT, ERROR):
      return {
        ...state,
        accountData: {
          username: '',
          email: '',
          country: '',
        },
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        accountId: '',
        accountData: {
          username: '',
          email: '',
          country: '',
        },
      };
    default:
      return state;
  }
};

export default authReducer;
