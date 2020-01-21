import { GET_CHARTS_PLACES,GET_CHECKIN_DASH } from '../actions/types';

const isEmpty = require('is-empty');

const initialState = {
  charts_places: [],
  charts_checkin: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CHARTS_PLACES:
      return {
        ...state,
        charts_places: action.payload
      };
      case GET_CHECKIN_DASH:
      return {
        ...state,
        charts_checkin: action.payload
      };
    default:
      return state;
  }
}
