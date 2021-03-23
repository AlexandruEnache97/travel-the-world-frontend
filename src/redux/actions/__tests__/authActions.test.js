import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { NODE_SERVER } from '../../../../config';
import actionTypes from '../../actionTypes';
import {
  getAccount, signIn, signOut, signUp, verifyAuth,
} from '../authActions';

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

const middleware = [thunk];
const mockStore = configureStore(middleware);
const mock = new MockAdapter(axios, { onNoMatch: 'throwException' });

describe('Authentication actions tests', () => {
  it('Should get account data', async () => {
    mock.onGet(`${NODE_SERVER.baseUrl}/api/accounts/1`).reply(200, {
      data: { username: 'George' },
    });
    const store = mockStore({});
    await store.dispatch(getAccount('1'));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: createActionType(GET_ACCOUNT, REQUEST),
    });
    expect(actions[1]).toEqual({
      type: createActionType(GET_ACCOUNT, SUCCESS),
      payload: { data: { username: 'George' } },
    });
  });

  it('Should get auth', async () => {
    const store = mockStore({});
    await store.dispatch(verifyAuth('1'));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: VERIFY_AUTH,
      payload: '1',
    });
    expect(actions[1]).toEqual({
      type: createActionType(GET_ACCOUNT, REQUEST),
    });
  });

  it('Should get error on wrong accountId', async () => {
    mock.onGet(`${NODE_SERVER.baseUrl}/api/accounts/2`).reply(500);
    const store = mockStore({});
    await store.dispatch(getAccount('2'));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: createActionType(GET_ACCOUNT, REQUEST),
    });
    expect(actions[1]).toEqual({
      type: createActionType(GET_ACCOUNT, ERROR),
    });
  });

  it('Should sign in', async () => {
    const signInData = {
      username: 'George',
      password: '123',
    };
    mock.onPost(`${NODE_SERVER.baseUrl}/api/sign-in`).reply(200, signInData);
    const store = mockStore({});
    await store.dispatch(signIn(signInData));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: createActionType(SIGN_IN, REQUEST),
    });
    expect(actions[1]).toEqual({
      type: createActionType(SIGN_IN, SUCCESS),
      payload: signInData,
    });
    expect(actions[2]).toEqual({
      type: createActionType(GET_ACCOUNT, REQUEST),
    });
  });

  it('Should handle sign in error', async () => {
    const signInData = {
      username: 'George',
      password: '123',
    };
    mock.onPost(`${NODE_SERVER.baseUrl}/api/sign-in`).reply(500, signInData);
    const store = mockStore({});
    await store.dispatch(signIn(signInData));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: createActionType(SIGN_IN, REQUEST),
    });
    expect(actions[1]).toEqual({
      type: createActionType(SIGN_IN, ERROR),
    });
  });

  it('Should sign up', async () => {
    const signUpData = {
      username: 'George',
      email: 'george@gmail.com',
      password: '123',
      country: 'Romania',
    };
    mock.onPost(`${NODE_SERVER.baseUrl}/api/sign-up`).reply(200, signUpData);
    const store = mockStore({});
    await store.dispatch(signUp(signUpData));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: createActionType(SIGN_UP, REQUEST),
    });
    expect(actions[1]).toEqual({
      type: createActionType(SIGN_UP, SUCCESS),
      payload: signUpData,
    });
    expect(actions[2]).toEqual({
      type: createActionType(GET_ACCOUNT, REQUEST),
    });
  });

  it('Should handle sign up error', async () => {
    const signUpData = {
      username: 'George',
      email: 'george@gmail.com',
      password: '123',
      country: 'Romania',
    };
    mock.onPost(`${NODE_SERVER.baseUrl}/api/sign-up`).reply(500, signUpData);
    const store = mockStore({});
    await store.dispatch(signUp(signUpData));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: createActionType(SIGN_UP, REQUEST),
    });
    expect(actions[1]).toEqual({
      type: createActionType(SIGN_UP, ERROR),
    });
  });

  it('Should sign out', async () => {
    const store = mockStore({});
    await store.dispatch(signOut());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: SIGN_OUT,
    });
  });
});
