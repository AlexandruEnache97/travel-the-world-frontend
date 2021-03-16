import { getAccountService, signInService, signUpService } from '../../service/authApi';
import { setToken } from '../../utils/authUtils';
import { clearLocalStorage, saveToLocalStorage } from '../../utils/localStorage';
import actionTypes from '../actionTypes';

const {
  createActionType,
  SUCCESS,
  ERROR,
  REQUEST,
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  GET_ACCOUNT,

} = actionTypes;

export const getAccount = (accountId) => async (dispatch) => {
  try {
    dispatch({
      type: createActionType(GET_ACCOUNT, REQUEST),
    });
    const { data } = await getAccountService(accountId);
    dispatch({
      type: createActionType(GET_ACCOUNT, SUCCESS),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: createActionType(GET_ACCOUNT, ERROR),
    });
  }
};

export const signIn = (userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: createActionType(SIGN_IN, REQUEST),
    });
    const { data } = await signInService(userInfo);
    setToken(data.token);
    saveToLocalStorage('token', data.token);
    saveToLocalStorage('accountId', data.accountId);
    dispatch({
      type: createActionType(SIGN_IN, SUCCESS),
      payload: data,
    });
    dispatch(getAccount(data.accountId));
  } catch (error) {
    dispatch({
      type: createActionType(SIGN_IN, ERROR),
    });
  }
};

export const signUp = (userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: createActionType(SIGN_UP, REQUEST),
    });
    const { data } = await signUpService(userInfo);
    setToken(data.token);
    saveToLocalStorage('token', data.token);
    saveToLocalStorage('accountId', data.accountId);
    dispatch({
      type: createActionType(SIGN_UP, SUCCESS),
      payload: data,
    });
    dispatch(getAccount(data.accountId));
  } catch (error) {
    dispatch({
      type: createActionType(SIGN_UP, ERROR),
    });
  }
};

export const signOut = () => async (dispatch) => {
  clearLocalStorage();
  dispatch({
    type: SIGN_OUT,
  });
};
