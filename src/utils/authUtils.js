import axios from 'axios';

export const setToken = (token) => {
  axios.defaults.headers.common.authorization = token;
};

export const deleteToken = () => {
  delete axios.defaults.headers.common.authorization;
};
