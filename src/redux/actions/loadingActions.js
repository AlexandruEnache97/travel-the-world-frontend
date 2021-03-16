/* eslint-disable no-console */
import actionTypes from '../actionTypes';

const {
  ADD_LOADING_STATE,
  REMOVE_LOADING_STATE,
} = actionTypes;

export const addLoadingState = (actionType) => (dispatch) => {
  try {
    dispatch({
      type: ADD_LOADING_STATE,
      payload: actionType,
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeLoadingState = (actionType) => (dispatch) => {
  try {
    dispatch({
      type: REMOVE_LOADING_STATE,
      payload: actionType,
    });
  } catch (error) {
    console.log(error);
  }
};
