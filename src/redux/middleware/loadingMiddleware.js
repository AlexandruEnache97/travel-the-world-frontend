import actionTypes from '../actionTypes';
import { addLoadingState, removeLoadingState } from '../actions/loadingActions';

const {
  SUCCESS,
  ERROR,
  REQUEST,
} = actionTypes;

export default () => (next) => (action) => {
  try {
    next(action);
    if (!action.type) return;

    const actionType = action.type.split('/')[0];
    const requestType = action.type.split('/')[1];

    switch (requestType) {
      case REQUEST:
        next(addLoadingState(actionType));
        break;
      case SUCCESS:
      case ERROR:
        next(removeLoadingState(actionType));
        break;
      default:
        break;
    }
  } catch (error) {
    next(action);
  }
};
