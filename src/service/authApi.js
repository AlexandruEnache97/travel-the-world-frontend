import {
  get,
  post,
} from './axiosOperations';
import { NODE_SERVER } from '../../config';

export const signInService = async (userData) => {
  const data = await post(`${NODE_SERVER.baseUrl}/api/sign-in`, userData);
  return data;
};

export const signUpService = async (userData) => {
  const data = await post(`${NODE_SERVER.baseUrl}/api/sign-up`, userData);
  return data;
};

export const getAccountService = async (accountId) => {
  const data = await get(`${NODE_SERVER.baseUrl}/api/accounts/${accountId}`);
  return data;
};
