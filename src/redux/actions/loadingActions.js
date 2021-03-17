/* eslint-disable no-console */
import actionTypes from '../actionTypes';

const {
  ADD_LOADING_STATE,
  REMOVE_LOADING_STATE,
} = actionTypes;

export const addLoadingState = (actionType) => (dispatch) => {
  dispatch({
    type: ADD_LOADING_STATE,
    payload: actionType,
  });
};

export const removeLoadingState = (actionType) => (dispatch) => {
  dispatch({
    type: REMOVE_LOADING_STATE,
    payload: actionType,
  });
};
