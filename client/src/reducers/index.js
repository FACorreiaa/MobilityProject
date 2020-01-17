import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './errorReducers';
import placeReducer from './placeReducers';
import clientReducers from './clientReducers';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  places: placeReducer,
  vehicles: clientReducers,
  balance: clientReducers,
  methods: clientReducers
});
