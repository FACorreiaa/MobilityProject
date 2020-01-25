import { NOTIFY_USER, GET_VALID_USERS } from '../actions/types';

const initialState = {
  users: {},
  validated: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NOTIFY_USER:
      return {
        ...state,
        users: action.payload
      };
    case GET_VALID_USERS:
      return {
        ...state,
        validated: action.payload
      };
    default:
      return state;
  }
}
