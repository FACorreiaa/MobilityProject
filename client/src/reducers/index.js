import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './errorReducers';
import placeReducer from './placeReducers';
import clientReducers from './clientReducers';
import dashReducers from './dashReducers';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  places: placeReducer,
  charts_places: dashReducers,
  charts_checkin: dashReducers,
  clients: clientReducers
});
