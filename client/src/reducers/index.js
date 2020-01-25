import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './errorReducers';
import placeReducer from './placeReducers';
import clientReducers from './clientReducers';
import dashReducers from './dashReducers';
import adminReducers from './adminreducers';
import funcReducers from './funcReducers';
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  places: placeReducer,
  charts_places: dashReducers,
  charts_checkin: dashReducers,
  clients: clientReducers,
  validUsers: adminReducers,
  updateUser: adminReducers,
  rental: adminReducers,
  validated: funcReducers,
  users: funcReducers
});
