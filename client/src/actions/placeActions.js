import axios from 'axios';

import { GET_PLACES, PLACES_LOADING, GET_ERRORS, USER_ERROR } from './types';
let apiUrl = 'http://localhost:5002/api/v1/place';

export const getPlaces = () => {
  return dispatch => {
    return axios
      .get(apiUrl)
      .then(places => {
        return dispatch({
          type: GET_PLACES,
          payload: places.data
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
export const setPlacesLoading = () => {
  return {
    type: PLACES_LOADING
  };
};
