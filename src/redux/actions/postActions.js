import { getAllPosts } from '../../service/postsApi';
import actionTypes from '../actionTypes';

const {
  createActionType,
  SUCCESS,
  ERROR,
  REQUEST,
  GET_POST,
  GET_ALL_POSTS,
//   CREATE_POST,
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

export const getPost = () => async (dispatch) => {
  try {
    dispatch({
      type: createActionType(GET_POST, REQUEST),
    });
  } catch (error) {
    dispatch({
      type: createActionType(GET_POST, ERROR),
    });
  }
};
