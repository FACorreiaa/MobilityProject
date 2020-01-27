import axios from 'axios';

import {
  GET_CHARTS_PLACES,
  GET_ERRORS,
  GET_CHECKIN_DASH,
  GET_OCCUPANCY
} from './types';

//see dashboard charts
export const getOccupancy = () => {
  return dispatch => {
    return axios
      .get('http://localhost:5002/api/v1/dashboard/places/occupancy_rate')
      .then(charts_places => {
        // console.log(charts_places.data);
        return dispatch({
          type: GET_CHARTS_PLACES,
          payload: charts_places.data
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

//see dashboard charts
export const getCheckinDash = () => {
  return dispatch => {
    return axios
      .get('http://localhost:5002/api/v1/dashboard/rentals/date/count')
      .then(charts_checkin => {
        return dispatch({
          type: GET_CHECKIN_DASH,
          payload: charts_checkin.data
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
