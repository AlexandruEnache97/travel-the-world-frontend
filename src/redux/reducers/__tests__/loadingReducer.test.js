import loadingReducer from '../loadingReducer';
import actionTypes from '../../actionTypes';

const {
  ADD_LOADING_STATE,
  REMOVE_LOADING_STATE,
} = actionTypes;

const initialState = {
  loadingState: [],
};

describe('Loading reducers tests', () => {
  it('Should return initial state', () => {
    expect(loadingReducer(initialState, {})).toEqual(initialState);
  });

  it('Should return default switch case', () => {
    expect(loadingReducer(initialState, { type: 'Empty' })).toEqual(initialState);
  });

  it('Should add loading to state', () => {
    expect(loadingReducer(initialState, {
      type: ADD_LOADING_STATE,
      payload: 'ADD_LOADING_STATE',
    })).toEqual({
      ...initialState,
      loadingState: ['ADD_LOADING_STATE'],
    });
  });

  it('Should remove loading from state', () => {
    initialState.loadingState = ['ADD_LOADING_STATE'];
    expect(loadingReducer(initialState, {
      type: REMOVE_LOADING_STATE,
      payload: 'ADD_LOADING_STATE',
    })).toEqual({
      ...initialState,
      loadingState: [],
    });
  });
});
