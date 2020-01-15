import axios from 'axios';

import { GET_VEHICLES, VEHICLES_LOADING, GET_ERRORS } from './types';

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

//User loading
export const setVehiclesLoading = () => {
  return {
    type: VEHICLES_LOADING
  };
};
