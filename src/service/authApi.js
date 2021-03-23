import {
  get,
  post,
} from './axiosOperations';
import { NODE_SERVER, AUTH_ROUTES } from '../../config';

export const signInService = async (userData) => {
  const data = await post(`${NODE_SERVER.baseUrl}/${AUTH_ROUTES.SIGN_IN}`, userData);
  return data;
};

export const signUpService = async (userData) => {
  const data = await post(`${NODE_SERVER.baseUrl}/${AUTH_ROUTES.SIGN_UP}`, userData);
  return data;
};

export const getAccountService = async (accountId) => {
  const data = await get(`${NODE_SERVER.baseUrl}/${AUTH_ROUTES.GET_ACCOUNT}/${accountId}`);
  return data;
};
