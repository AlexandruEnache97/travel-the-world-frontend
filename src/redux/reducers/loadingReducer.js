import actionTypes from '../actionTypes';

const {
  ADD_LOADING_STATE,
  REMOVE_LOADING_STATE,
} = actionTypes;

const initialState = {
  loadingState: [],
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOADING_STATE:
      return {
        ...state,
        loadingState: [...state.loadingState, action.payload],
      };
    case REMOVE_LOADING_STATE:
      return {
        ...state,
        loadingState: state.loadingState.filter((loading) => loading !== action.payload),
      };
    default:
      return state;
  }
};

export default loadingReducer;
