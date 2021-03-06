import actionTypes from '../actionTypes';

const {
  CREATE_ALERT,
  REMOVE_ALERT,
} = actionTypes;

const initialState = {
  active: false,
  message: '',
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ALERT:
      return {
        active: true,
        message: action.payload,
      };
    case REMOVE_ALERT:
      if (state.message === action.payload) {
        return {
          active: false,
          message: '',
        };
      }
      return state;
    default:
      return state;
  }
};

export default alertReducer;
