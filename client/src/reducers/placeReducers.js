import { GET_PLACES, PLACES_LOADING } from '../actions/types';

const initialState = {
  places: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PLACES:
      return {
        ...state,
        places: action.payload
      };
    case PLACES_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
