import axios from 'axios';

import { NOTIFY_USER, UPDATE_ERROS, GET_VALID_USERS } from './types';

export const updateNotifications = id => {
  return dispatch => {
    return axios
      .put(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/v1/notify/${id}`
      )
      .then(user => {
        return dispatch({
          type: NOTIFY_USER,
          payload: user
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

export const validUsers = () => {
  return dispatch => {
    return axios
      .get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/v1/users/func/validUsers`
      )
      .then(validated => {
        return dispatch({
          type: GET_VALID_USERS,
          payload: validated.data
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

///api/v1/users/func/validUsers
