import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import actionTypes from '../../actionTypes';
import { addLoadingState, removeLoadingState } from '../loadingActions';

const {
  ADD_LOADING_STATE,
  REMOVE_LOADING_STATE,
} = actionTypes;

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('Loading actions test', () => {
  it('Should add loading to state', () => {
    const store = mockStore({});
    store.dispatch(addLoadingState('Loading'));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: ADD_LOADING_STATE,
      payload: 'Loading',
    });
  });

  it('Should remove loading from state', () => {
    const store = mockStore({});
    store.dispatch(removeLoadingState('Loading'));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: REMOVE_LOADING_STATE,
      payload: 'Loading',
    });
  });
});
