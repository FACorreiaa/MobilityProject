import {
  GET_VEHICLES,
  VEHICLES_LOADING,
  GET_BALANCE,
  UPDATE_BALANCE,
  GET_RENTAL_METHODS,
  POST_CHECKIN
} from '../actions/types';

const isEmpty = require('is-empty');

const initialState = {
  vehicles: [],
  loading: false,
  balance: [],
  methods: [],
  checkin: {}
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
    case GET_BALANCE:
      return {
        ...state,
        balance: action.payload
      };
    case GET_RENTAL_METHODS:
      return {
        ...state,
        methods: action.payload
      };
    case UPDATE_BALANCE:
      return {
        ...state,
        balance: action.payload
      };
    case POST_CHECKIN:
      return {
        ...state,
        checkin: action.payload
      };
    default:
      return state;
  }
}
