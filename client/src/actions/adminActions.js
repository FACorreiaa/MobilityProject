import axios from 'axios';

import {
  GET_VALIDATE_USERS,
  GET_ERRORS,
  UPDATE_VALIDATE_USERS,
  UPDATE_ERROS,
  GET_RENTAL_DATA
} from './types';

export const getValidUsers = () => {
  return dispatch => {
    return axios
      .get('http://localhost:5002/api/v1/users/admin/waitvalidation')
      .then(validUsers => {
        return dispatch({
          type: GET_VALIDATE_USERS,
          payload: validUsers.data
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

export const updateUsers = (id, userId) => {
  return dispatch => {
    return axios
      .put(`http://localhost:5002/api/v1/users/${id}/validation/${userId}`)
      .then(updateUser => {
        return dispatch({
          type: UPDATE_VALIDATE_USERS,
          payload: updateUser
        });
      })

      .catch(err =>
        dispatch({
          type: UPDATE_ERROS,
          payload: err
        })
      );
  };
};

///api/v1/rental/check
export const getRentalData = () => {
  return dispatch => {
    return axios
      .get(`http://localhost:5002/api/v1/rental/check`)
      .then(rental => {
        return dispatch({
          type: GET_RENTAL_DATA,
          payload: rental.data
        });
      })

      .catch(err =>
        dispatch({
          type: UPDATE_ERROS,
          payload: err
        })
      );
  };
};
