import axios from 'axios';

import { GET_CHARTS_PLACES, GET_ERRORS, GET_CHECKIN_DASH } from './types';

//see dashboard charts
export const getOccupancy = () => {
  return dispatch => {
    return axios
      .get('http://localhost:5002/api/v1/dashboard/places/occupancy_rate')
      .then(places => {
        let labels = [];
        let values = [];
        for (let i = 0; i < places.data.length; i++) {
          let place = places.data[i];
          labels[i] = place.street;
          values[i] = place.occupancy;
        }
        let charts_places = {
          labels: labels,
          data: values
        };
        return dispatch({
          type: GET_CHARTS_PLACES,
          payload: charts_places
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
      .then(checkins => {
        let labels = [];
        let values = [];
        for (let i = 0; i < checkins.data.length; i++) {
          let checkin = checkins.data[i];
          labels[i] = checkin._id.date;
          values[i] = checkin.count;
        }

        let charts_checkin = {
          labels: labels,
          data: values
        };
        return dispatch({
          type: GET_CHECKIN_DASH,
          payload: charts_checkin
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
