import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import {
  GET_ERRORS,
  SET_CURRECT_USER,
  USER_LOADING,
  SET_CURRENT_USER
} from './types';

//Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('http://localhost:5002/api/v1/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    );
};

//login
export const loginUser = userData => dispatch => {
  axios
    .post('http://localhost:5002/api/v1/login', userData)
    .then(res => {
      //Save to localstorage
      //Set token to localStorage

      const { token } = res.data;
      localStorage.setItem('jwtToken', token);

      //set token to auth header
      setAuthToken(token);

      //decode token to get user data
      const decoded = jwt_decode(token);

      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

//Set loggedin uset
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

//Log user out
export const logoutUser = () => dispatch => {
  //remove token from local storage
  localStorage.removeItem('jwtToken');

  //remove auth header for future requests
  setAuthToken(false);

  //set current user to empty object, set isAuth to false
  dispatch(setCurrentUser({}));
};
