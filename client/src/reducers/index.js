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
  vehicles: clientReducers,
  charts_places: dashReducers,
  balance: clientReducers,
  methods: clientReducers
});
