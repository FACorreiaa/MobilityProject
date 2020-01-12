import axios from 'axios';

import { GET_PLACES, PLACES_LOADING, GET_ERRORS } from './types';
let apiUrl = 'http://localhost:5002/api/v1/place';
//get places
/* export const getPlaces = dispatch => {
  return axios
    .get(apiUrl)
    .then(places => ({ type: GET_PLACES, payload: places }))
    .catch(err => ({ type: GET_ERRORS, payload: err }));
}; */

export const getPlaces = () => {
  return dispatch => {
    return axios
      .get('http://localhost:5002/api/v1/place')
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
/* 
export const fetchPlaces = places => {
  return {
    type: GET_PLACES,
    places
  };
}; */

/* export const getPlaces = () => {
  return dispatch => {
    return axios
      .get(apiUrl)
      .then(places => {
        return dispatch({
          type: GET_PLACES,
          payload: places.data
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ERRORS,
          payload: error
        });
      });
  };
}; */

//User loading
export const setPlacesLoading = () => {
  return {
    type: PLACES_LOADING
  };
};
