import postReducer from '../postReducer';
import actionTypes from '../../actionTypes';
import {
  CREATE_POST, GET_ALL_POSTS, GET_LIKED_POSTS, GET_POST,
} from '../../actionTypes/postTypes';

const {
  createActionType,
  SUCCESS,
  ERROR,
} = actionTypes;

describe('Post reducers tests', () => {
  const initialState = {
    currentPosts: [],
    likedPosts: [],
    totalResults: 0,
    singlePost: {},
    pageNumber: 0,
  };
  it('Should return initial state', () => {
    expect(postReducer(initialState, {})).toEqual(initialState);
  });

  it('Should return default switch case', () => {
    expect(postReducer(initialState, { type: 'Empty' })).toEqual(initialState);
  });

  it('Test get posts', () => {
    expect(postReducer(initialState, {
      type: createActionType(GET_ALL_POSTS, SUCCESS),
      payload: {
        data: {
          posts: ['Atlantic', 'Pacific'],
          totalResults: 2,
        },
        pageNumber: 1,
      },
    })).toEqual({
      ...initialState,
      currentPosts: ['Atlantic', 'Pacific'],
      totalResults: 2,
      pageNumber: 1,
    });

    expect(postReducer(initialState, {
      type: createActionType(GET_ALL_POSTS, ERROR),
    })).toEqual({
      ...initialState,
      currentPosts: [],
      totalResults: 0,
    });
  });

  it('Test get liked posts', () => {
    expect(postReducer(initialState, {
      type: createActionType(GET_LIKED_POSTS, SUCCESS),
      payload: {
        data: {
          likedPosts: ['Atlantic', 'Pacific'],
        },
      },
    })).toEqual({
      ...initialState,
      likedPosts: ['Atlantic', 'Pacific'],
    });

    expect(postReducer(initialState, {
      type: createActionType(GET_LIKED_POSTS, ERROR),
    })).toEqual({
      ...initialState,
      likedPosts: [],
    });
  });

  it('Tests get single post', () => {
    expect(postReducer(initialState, {
      type: createActionType(GET_POST, SUCCESS),
      payload: {
        singlePost: { title: 'Atlantic' },
      },
    })).toEqual({
      ...initialState,
      singlePost: { title: 'Atlantic' },
    });

    expect(postReducer(initialState, {
      type: createActionType(GET_POST, ERROR),
    })).toEqual({
      ...initialState,
      singlePost: {},
    });
  });

  it('Tests create post', () => {
    expect(postReducer(initialState, {
      type: createActionType(CREATE_POST, SUCCESS),
    })).toEqual({
      ...initialState,
    });

    expect(postReducer(initialState, {
      type: createActionType(CREATE_POST, ERROR),
    })).toEqual({
      ...initialState,
    });
  });
});
