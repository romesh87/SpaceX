import axios from 'axios';

import * as actionTypes from './actionTypes';

export const getLaunches = () => async dispatch => {
  const queryString = `?sort=flight_number&order=desc`;
  // if (output) {
  //   queryString += `&limit=${output.limit}&offset=${output.offset}`;
  // }

  try {
    const res = await axios.get(
      `https://api.spacexdata.com/v3/launches/past/${queryString}`
    );

    dispatch({
      type: actionTypes.GET_LAUNCHES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: actionTypes.LAUNCH_ERROR,
      payload: err
    });
  }
};

export const setCurrentPage = (page, itemsPerPage) => dispatch => {
  dispatch({
    type: actionTypes.SET_CURRENT_PAGE,
    payload: { page, itemsPerPage }
  });
};
