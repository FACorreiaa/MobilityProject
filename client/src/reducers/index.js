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
<<<<<<< HEAD
  charts_places: dashReducers
=======
  balance: clientReducers,
  methods: clientReducers
>>>>>>> 3d9e0768e1723f79a3e0f0743dbd8d0f83775c27
});
