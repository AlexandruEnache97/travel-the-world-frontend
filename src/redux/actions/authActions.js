/* eslint-disable quotes */
import {
  getAccountService,
  signInService,
  signUpService,
} from "../../service/authApi.ts";
import { setToken } from "../../utils/authUtils.ts";
import {
  clearLocalStorage,
  saveToLocalStorage,
} from "../../utils/localStorage.ts";
import actionTypes from "../actionTypes";
import { createAlert } from "./alertActions";

const {
  createActionType,
  SUCCESS,
  ERROR,
  REQUEST,
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  GET_ACCOUNT,
  VERIFY_AUTH,
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

export const verifyAuth = (data) => (dispatch) => {
  dispatch({
    type: VERIFY_AUTH,
    payload: data,
  });
  dispatch(getAccount(data.accountId));
};

export const signIn = (userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: createActionType(SIGN_IN, REQUEST),
    });
    const { data } = await signInService(userInfo);
    setToken(data.token);
    saveToLocalStorage("token", data.token);
    saveToLocalStorage("accountId", data.accountId);
    dispatch({
      type: createActionType(SIGN_IN, SUCCESS),
      payload: data,
    });
    dispatch(getAccount(data.accountId));
  } catch (error) {
    dispatch({
      type: createActionType(SIGN_IN, ERROR),
    });
    dispatch(createAlert("Username or password incorrect", 3));
  }
};

export const signUp = (userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: createActionType(SIGN_UP, REQUEST),
    });
    const { data } = await signUpService(userInfo);
    setToken(data.token);
    saveToLocalStorage("token", data.token);
    saveToLocalStorage("accountId", data.accountId);
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
