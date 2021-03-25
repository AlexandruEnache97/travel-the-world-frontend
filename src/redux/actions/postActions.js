import {
  getAllPosts, getPostsLiked, getSinglePost, makePost,
} from '../../service/postsApi';
import actionTypes from '../actionTypes';

const {
  createActionType,
  SUCCESS,
  ERROR,
  REQUEST,
  GET_POST,
  GET_ALL_POSTS,
  CREATE_POST,
  GET_LIKED_POSTS,
} = actionTypes;

export const getPosts = (pageNumber) => async (dispatch) => {
  try {
    dispatch({
      type: createActionType(GET_ALL_POSTS, REQUEST),
    });
    const { data } = await getAllPosts(pageNumber);

    if (data.totalResults === 0) {
      dispatch({
        type: createActionType(GET_ALL_POSTS, ERROR),
      });
    } else {
      dispatch({
        type: createActionType(GET_ALL_POSTS, SUCCESS),
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: createActionType(GET_ALL_POSTS, ERROR),
    });
  }
};

export const getLikedPosts = (pageNumber) => async (dispatch) => {
  try {
    dispatch({
      type: createActionType(GET_LIKED_POSTS, REQUEST),
    });
    const { data } = await getPostsLiked(pageNumber);

    dispatch({
      type: createActionType(GET_LIKED_POSTS, SUCCESS),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: createActionType(GET_LIKED_POSTS, ERROR),
    });
  }
};

export const createPost = (postData) => async (dispatch) => {
  try {
    dispatch({
      type: createActionType(CREATE_POST, REQUEST),
    });
    const { data } = await makePost(postData);

    if (data.success) {
      dispatch({
        type: createActionType(CREATE_POST, SUCCESS),
      });
      dispatch(getPosts(1));
    } else {
      dispatch({
        type: createActionType(CREATE_POST, ERROR),
      });
    }
  } catch (error) {
    dispatch({
      type: createActionType(CREATE_POST, ERROR),
    });
  }
};

export const getPost = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: createActionType(GET_POST, REQUEST),
    });
    const { data } = await getSinglePost(postId);
    dispatch({
      type: createActionType(GET_POST, SUCCESS),
      payload: { singlePost: data },
    });
  } catch (error) {
    dispatch({
      type: createActionType(GET_POST, ERROR),
    });
  }
};
