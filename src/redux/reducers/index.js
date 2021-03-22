import { combineReducers } from 'redux';
import authReducer from './authReducer';
import loadingReducer from './loadingReducer';
import postReducer from './postReducer';

export default combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  posts: postReducer,
});
