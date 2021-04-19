import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { NODE_SERVER } from '../../../../config';
import actionTypes from '../../actionTypes';
import { GET_LIKED_POSTS } from '../../actionTypes/postTypes';
import {
  createPost, getLikedPosts, getOnePost, getPosts,
} from '../postActions';

const {
  createActionType,
  SUCCESS,
  ERROR,
  REQUEST,
  GET_ALL_POSTS,
  GET_POST,
  CREATE_POST,
} = actionTypes;

const middleware = [thunk];
const mockStore = configureStore(middleware);
const mock = new MockAdapter(axios, { onNoMatch: 'throwException' });

describe('Post actions tests', () => {
  it('Should get posts', async () => {
    mock.onGet(`${NODE_SERVER.baseUrl}/api/allPosts/1`).reply(200, {
      data: { post: 'Atlantic' },
    });
    const store = mockStore({});
    await store.dispatch(getPosts('1'));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: createActionType(GET_ALL_POSTS, REQUEST),
    });
    expect(actions[1]).toEqual({
      type: createActionType(GET_ALL_POSTS, SUCCESS),
      payload: {
        data: { post: 'Atlantic' },
      },
    });
  });

  it('Should handle no results on get posts', async () => {
    mock.onGet(`${NODE_SERVER.baseUrl}/api/allPosts/1`).reply(200, {
      totalResults: 0,
    });
    const store = mockStore({});
    await store.dispatch(getPosts('1'));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: createActionType(GET_ALL_POSTS, REQUEST),
    });
    expect(actions[1]).toEqual({
      type: createActionType(GET_ALL_POSTS, ERROR),
    });
  });

  it('Should handle backend error', async () => {
    mock.onGet(`${NODE_SERVER.baseUrl}/api/allPosts/1`).reply(500);
    const store = mockStore({});
    await store.dispatch(getPosts('1'));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: createActionType(GET_ALL_POSTS, REQUEST),
    });
    expect(actions[1]).toEqual({
      type: createActionType(GET_ALL_POSTS, ERROR),
    });
  });

  it('Should get single post', async () => {
    mock.onGet(`${NODE_SERVER.baseUrl}/api/post/1`).reply(200, {
      post: 'Atlantic',
    });
    const store = mockStore({});
    await store.dispatch(getOnePost(1));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: createActionType(GET_POST, REQUEST),
    });
    expect(actions[1]).toEqual({
      type: createActionType(GET_POST, SUCCESS),
      payload: {
        singlePost: {
          post: 'Atlantic',
        },
      },
    });
  });

  it('Should handle error on single post', async () => {
    mock.onGet(`${NODE_SERVER.baseUrl}/api/post/1`).reply(500);
    const store = mockStore({});
    await store.dispatch(getOnePost(1));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: createActionType(GET_POST, REQUEST),
    });
    expect(actions[1]).toEqual({
      type: createActionType(GET_POST, ERROR),
    });
  });

  it('Should create post', async () => {
    mock.onPost(`${NODE_SERVER.baseUrl}/api/post`).reply(200, {
      success: true,
    });
    const store = mockStore({});
    await store.dispatch(createPost({ post: 'Atlantic' }));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: createActionType(CREATE_POST, REQUEST),
    });
    expect(actions[1]).toEqual({
      type: createActionType(CREATE_POST, SUCCESS),
    });
    expect(actions[2]).toEqual({
      type: createActionType(GET_ALL_POSTS, REQUEST),
    });
  });

  it('Should handle error request on create post', async () => {
    mock.onPost(`${NODE_SERVER.baseUrl}/api/post`).reply(200, {
      success: false,
    });
    const store = mockStore({});
    await store.dispatch(createPost({ post: 'Atlantic' }));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: createActionType(CREATE_POST, REQUEST),
    });
    expect(actions[1]).toEqual({
      type: createActionType(CREATE_POST, ERROR),
    });
  });

  it('Should handle error backend on create post', async () => {
    mock.onPost(`${NODE_SERVER.baseUrl}/api/post`).reply(500);
    const store = mockStore({});
    await store.dispatch(createPost({ post: 'Atlantic' }));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: createActionType(CREATE_POST, REQUEST),
    });
    expect(actions[1]).toEqual({
      type: createActionType(CREATE_POST, ERROR),
    });
  });

  it('Should get liked posts by user', async () => {
    mock.onGet(`${NODE_SERVER.baseUrl}/api/likedPosts/1`).reply(200, {
      post: 'Atlantic',
    });
    const store = mockStore({});
    await store.dispatch(getLikedPosts(1));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: createActionType(GET_LIKED_POSTS, REQUEST),
    });
    expect(actions[1]).toEqual({
      type: createActionType(GET_LIKED_POSTS, SUCCESS),
      payload: {
        post: 'Atlantic',
      },
    });
  });

  it('Should handle backend error on get liked posts by user', async () => {
    mock.onGet(`${NODE_SERVER.baseUrl}/api/likedPosts/1`).reply(500);
    const store = mockStore({});
    await store.dispatch(getLikedPosts(1));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: createActionType(GET_LIKED_POSTS, REQUEST),
    });
    expect(actions[1]).toEqual({
      type: createActionType(GET_LIKED_POSTS, ERROR),
    });
  });
});
