import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './errorReducers';
import placeReducer from './placeReducers';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  places: placeReducer
});
