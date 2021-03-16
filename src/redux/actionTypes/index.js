import * as authTypes from './authTypes';

const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';
const REQUEST = 'REQUEST';

const createActionType = (...types) => types.join('/');

export default {
  createActionType,
  SUCCESS,
  ERROR,
  REQUEST,
  ...authTypes,
};
