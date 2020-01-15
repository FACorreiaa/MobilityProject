import { GET_VEHICLES, VEHICLES_LOADING } from '../actions/types';

const isEmpty = require('is-empty');

const initialState = {
  vehicles: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_VEHICLES:
      return {
        ...state,
        vehicles: action.payload
      };
    case VEHICLES_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
