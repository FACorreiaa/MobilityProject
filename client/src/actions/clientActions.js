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
  POST_CHECKIN_ERROR
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
      .then(postBalance => {
        return dispatch({ type: POST_CHECKIN, payload: postBalance });
      })
      .catch(err =>
        dispatch({
          type: POST_CHECKIN_ERROR,
          payload: err
        })
      );
  };
};
