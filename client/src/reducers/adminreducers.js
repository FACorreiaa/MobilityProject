import {
  GET_VALIDATE_USERS,
  USER_LOADING,
  UPDATE_VALIDATE_USERS,
  GET_RENTAL_DATA
} from '../actions/types';

const isEmpty = require('is-empty');

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  validUsers: [],
  updateUser: [],
  rental: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_VALIDATE_USERS:
      return {
        ...state,
        validUsers: action.payload
      };
    case UPDATE_VALIDATE_USERS:
      return {
        ...state,
        updateUser: action.payload
      };
    case GET_RENTAL_DATA:
      return {
        ...state,
        rental: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
