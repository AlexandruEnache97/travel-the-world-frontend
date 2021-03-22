import actionTypes from '../actionTypes';

const {
  createActionType,
  SUCCESS,
  ERROR,
  //   GET_POST,
  GET_ALL_POSTS,
  //   CREATE_POST,
} = actionTypes;

const initialState = {
  currentPosts: [],
  totalResults: 0,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case createActionType(GET_ALL_POSTS, SUCCESS):
      return {
        ...state,
        currentPosts: action.payload.posts,
        totalResults: action.payload.totalResults,
      };
    case createActionType(GET_ALL_POSTS, ERROR):
      return {
        ...state,
        currentPosts: [],
        totalResults: 0,
      };
    default:
      return state;
  }
};

export default postReducer;
