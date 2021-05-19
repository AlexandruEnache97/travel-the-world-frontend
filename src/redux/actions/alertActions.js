import actionTypes from '../actionTypes';

const {
  CREATE_ALERT,
  REMOVE_ALERT,
} = actionTypes;

export const createAlert = (message, timeout) => (dispatch) => {
  dispatch({
    type: CREATE_ALERT,
    payload: message,
  });
  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: message,
    });
  }, timeout * 1000);
};

export const removeAlert = (message) => ({
  type: REMOVE_ALERT,
  payload: message,
});
