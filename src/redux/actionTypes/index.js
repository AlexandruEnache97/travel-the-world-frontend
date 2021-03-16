import * as authTypes from './authTypes';
import * as loadingTypes from './loadingTypes';

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
  ...loadingTypes,
};
