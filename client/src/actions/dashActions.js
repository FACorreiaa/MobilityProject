import axios from 'axios';

import {
  GET_CHARTS_PLACES,
  GET_ERRORS
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

/*
fetch("http://localhost:5002/api/v1/dashboard/places/occupancy_rate")
    .then(res => res.json())
    .then(data => {
        //document.querySelector('#chartTitle').textContent = `Total Votes: ${totalVotes}`;
        console.log(data);
        
        var datapointsArray =  [
          { label: data[0].street,  y: 10  },
          { label: "Orange", y: 15  },
          { label: "Banana", y: 25  },
          { label: "Mango",  y: 30  },
          { label: "Grape",  y: 28  }
        ];
    });
  */

