import { GET_CHARTS_PLACES } from '../actions/types';

const isEmpty = require('is-empty');

const initialState = {
  charts_places: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CHARTS_PLACES:
      return {
        ...state,
        charts_places: action.payload
      };
    default:
      return state;
  }
}
