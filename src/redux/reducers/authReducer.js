import actionTypes from '../actionTypes';

const {
  SIGN_IN,
  SIGN_UP,
} = actionTypes;

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

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        accountId: action.payload.accountId,
      };
    case SIGN_UP: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
