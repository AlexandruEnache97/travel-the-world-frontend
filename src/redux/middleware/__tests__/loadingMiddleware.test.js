import actionTypes from '../../actionTypes';
import loadingMiddleware from '../loadingMiddleware';

const {
  createActionType,
  SUCCESS,
  ERROR,
  REQUEST,
  SIGN_IN,
} = actionTypes;

const next = jest.fn();

describe('Loading Middleware tests', () => {
  it('Should catch without action', () => {
    loadingMiddleware()(next)();
  });

  it('Should return without action type', () => {
    const action = {};
    loadingMiddleware()(next)(action);
  });

  it('Should get action type request', () => {
    const action = { type: createActionType(SIGN_IN, REQUEST) };
    loadingMiddleware()(next)(action);
  });

  it('Should get action type success', () => {
    const action = { type: createActionType(SIGN_IN, SUCCESS) };
    loadingMiddleware()(next)(action);
  });

  it('Should get action type error', () => {
    const action = { type: createActionType(SIGN_IN, ERROR) };
    loadingMiddleware()(next)(action);
  });

  it('Should get default case type', () => {
    const action = { type: createActionType(SIGN_IN, 'SIGN') };
    loadingMiddleware()(next)(action);
  });
});
