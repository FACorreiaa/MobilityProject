import axios from 'axios';

import {
  GET_VEHICLES,
  VEHICLES_LOADING,
  GET_ERRORS,
  GET_USER,
  USER_ERROR,
  GET_BALANCE,
  UPDATE_BALANCE,
  BALANCE_ERROR,
  GET_RENTAL_METHODS,
  RENTAL_METHODS_ERROR,
  POST_CHECKIN,
  POST_CHECKIN_ERROR,
  GET_CONSULT,
  CONSULT_ERROR,
  PUT_CHECKOUT,
  CHECKOUT_ERROR,
  PUT_PAYMENT,
  PAYMENT_ERROR
} from './types';

export const getVehicles = () => {
  return dispatch => {
    return axios
      .get('http://localhost:5002/api/v1/vehicles')
      .then(vehicles => {
        return dispatch({
          type: GET_VEHICLES,
          payload: vehicles.data
        });
      })

      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err
        })
      );
  };
};

export const getRentalMethods = () => {
  return dispatch => {
    return axios
      .get('http://localhost:5002/api/v1/rental/rentalMethods')
      .then(methods => {
        return dispatch({
          type: GET_RENTAL_METHODS,
          payload: methods.data
        });
      })

      .catch(err =>
        dispatch({
          type: RENTAL_METHODS_ERROR,
          payload: err
        })
      );
  };
};

export const getBalance = id => {
  return dispatch => {
    return axios
      .get(`http://localhost:5002/api/v1/users/${id}/balance`)
      .then(balance => {
        return dispatch({
          type: GET_BALANCE,
          payload: balance.data
        });
      })
      .catch(err =>
        dispatch({
          type: BALANCE_ERROR,
          payload: err
        })
      );
  };
};

export const updateBalance = (id, balance) => {
  return dispatch => {
    return axios
      .put(`http://localhost:5002/api/v1/users/${id}/balance/${balance}`)
      .then(updateBalance => {
        return dispatch({
          type: UPDATE_BALANCE,
          payload: updateBalance
        });
      })
      .catch(err =>
        dispatch({
          type: BALANCE_ERROR,
          payload: err
        })
      );
  };
};

///api/v1/rental/checkin/user/:user/vehicle/:id/:rentalMethod/lat/:lat/lon/:lon
export const postCheckIn = (user, id, rentalMethod, lat, lon) => {
  return dispatch => {
    return axios
      .post(
        `http://localhost:5002/api/v1/rental/checkin/user/${user}/vehicle/${id}/${rentalMethod}/lat/${lat}/lon/${lon}`
      )
      .then(checkin => {
        return dispatch({ type: POST_CHECKIN, payload: checkin.data });
      })
      .catch(err =>
        dispatch({
          type: POST_CHECKIN_ERROR,
          payload: err
        })
      );
  };
};

///api/v1/rental/:client
export const getConsult = id => {
  return dispatch => {
    return axios
      .get(`http://localhost:5002/api/v1/rental/consult/${id}`)
      .then(consult => {
        return dispatch({
          type: GET_CONSULT,
          payload: consult.data
        });
      })
      .catch(err =>
        dispatch({
          type: CONSULT_ERROR,
          payload: err
        })
      );
  };
};

///api/v1/rental/checkout/:rental/lat/:lat/lon/:lon
export const updateCheckout = (id, vehicle, lat, lon) => {
  return dispatch => {
    return axios
      .put(
        `http://localhost:5002/api/v1/rental/checkout/${id}/vehicle/${vehicle}/lat/${lat}/lon/${lon}`
      )
      .then(checkout => {
        return dispatch({
          type: PUT_CHECKOUT,
          payload: checkout.data
        });
      })
      .catch(err =>
        dispatch({
          type: CHECKOUT_ERROR,
          payload: err
        })
      );
  };
};

///api/v1/rental/payment/user/:user/:id
export const updatePayment = id => {
  return dispatch => {
    return axios
      .put(`http://localhost:5002/api/v1/rental/payment/${id}`)
      .then(payment => {
        return dispatch({
          type: PUT_PAYMENT,
          payload: payment.data
        });
      })
      .catch(err =>
        dispatch({
          type: PAYMENT_ERROR,
          payload: err
        })
      );
  };
};
