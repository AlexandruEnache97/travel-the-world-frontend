import { get, post, put } from "./axiosOperations";
import { NODE_SERVER, AUTH_ROUTES } from "../../config";

type SignIn = (userData: { username: string, password: string }) => any;
type SignUp = (userData: string) => any;
type GetAccount = (accountId: string) => any;
type ChangeProfileImage = (imageUrl: string) => any;
type ChangeProfileDetails = (userData: { username: string }) => any;
type ChangePassword = (userData: {username: string}) => any;

export const signInService: SignIn = async (userData) => {
  const data = await post(
    `${NODE_SERVER.baseUrl}/${AUTH_ROUTES.SIGN_IN}`,
    userData
  );
  return data;
};

export const signUpService: SignUp = async (userData) => {
  const data = await post(
    `${NODE_SERVER.baseUrl}/${AUTH_ROUTES.SIGN_UP}`,
    userData
  );
  return data;
};

export const getAccountService: GetAccount = async (accountId) => {
  const data = await get(
    `${NODE_SERVER.baseUrl}/${AUTH_ROUTES.GET_ACCOUNT}/${accountId}`
  );
  return data;
};

export const changeProfileImage: ChangeProfileImage = async (imageUrl) => {
  const data = await put(
    `${NODE_SERVER.baseUrl}/${AUTH_ROUTES.CHANGE_PROFILE_IMAGE}`,
    imageUrl
  );
  return data;
};

export const changeProfileDetails: ChangeProfileDetails = async (userData) => {
  const data = await put(
    `${NODE_SERVER.baseUrl}/${AUTH_ROUTES.CHANGE_PROFILE_DETAILS}`,
    userData
  );
  return data;
};

export const changePassword: ChangePassword = async (userData) => {
  const data = await put(
    `${NODE_SERVER.baseUrl}/${AUTH_ROUTES.CHANGE_PASSWORD}`,
    userData
  );
  return data;
};
