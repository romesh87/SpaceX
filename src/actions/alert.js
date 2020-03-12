import { v4 as uuidv4 } from 'uuid';

import * as actionTypes from './actionTypes';

export const setAlert = (type, msg, timeout = 5000) => dispatch => {
  const id = uuidv4();

  dispatch({
    type: actionTypes.SET_ALERT,
    payload: { id, type, msg }
  });

  setTimeout(() => {
    dispatch({
      type: actionTypes.REMOVE_ALERT,
      payload: id
    });
  }, timeout);
};
