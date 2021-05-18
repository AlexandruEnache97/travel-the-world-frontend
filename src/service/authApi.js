import {
  get,
  post,
  put,
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

export const changeProfileImage = async (imageUrl) => {
  const data = await put(`${NODE_SERVER.baseUrl}/${AUTH_ROUTES.CHANGE_PROFILE_IMAGE}`, imageUrl);
  return data;
};

export const changeProfileDetails = async (userData) => {
  const data = await put(`${NODE_SERVER.baseUrl}/${AUTH_ROUTES.CHANGE_PROFILE_DETAILS}`, userData);
  return data;
};

export const changePassword = async (userData) => {
  const data = await put(`${NODE_SERVER.baseUrl}/${AUTH_ROUTES.CHANGE_PASSWORD}`, userData);
  return data;
};
