import actionTypes from '../actionTypes';

const {
  createActionType,
  SUCCESS,
  ERROR,
  GET_POST,
  GET_ALL_POSTS,
  CREATE_POST,
  GET_LIKED_POSTS,
} = actionTypes;

const initialState = {
  currentPosts: [],
  likedPosts: [],
  totalResults: 0,
  singlePost: {},
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case createActionType(GET_ALL_POSTS, SUCCESS):
      return {
        ...state,
        currentPosts: [...state.currentPosts, ...action.payload.posts],
        totalResults: action.payload.totalResults,
      };
    case createActionType(GET_ALL_POSTS, ERROR):
      return {
        ...state,
        currentPosts: [],
        totalResults: 0,
      };
    case createActionType(GET_LIKED_POSTS, SUCCESS):
      return {
        ...state,
        likedPosts: action.payload.likedPosts,
      };
    case createActionType(GET_LIKED_POSTS, ERROR):
      return {
        ...state,
        likedPosts: [],
      };
    case createActionType(GET_POST, SUCCESS):
      return {
        ...state,
        singlePost: action.payload.singlePost,
      };
    case createActionType(GET_POST, ERROR):
      return {
        ...state,
        singlePost: {},
      };
    case createActionType(CREATE_POST, SUCCESS):
    case createActionType(CREATE_POST, ERROR):
    default:
      return state;
  }
};

export default postReducer;
