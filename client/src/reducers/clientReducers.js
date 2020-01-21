import {
  GET_VEHICLES,
  VEHICLES_LOADING,
  GET_BALANCE,
  UPDATE_BALANCE,
  GET_RENTAL_METHODS,
  POST_CHECKIN,
  GET_CONSULT,
  PUT_CHECKOUT,
  PUT_PAYMENT
} from '../actions/types';

const initialState = {
  vehicles: [],
  loading: false,
  balance: [],
  methods: [],
  checkin: {},
  clients: [],
  isCheckedIn: false,
  consult: [],
  checkout: [],
  payment: []
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
        isCheckedIn: true,
        checkin: action.payload
      };
    case GET_CONSULT:
      return {
        ...state,
        consult: action.payload
      };
    case PUT_CHECKOUT:
      return {
        ...state,
        checkout: action.payload
      };
    default:
      return state;
    case PUT_PAYMENT:
      return {
        ...state,
        payment: action.checkout
      };
  }
}
