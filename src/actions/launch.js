import axios from 'axios';

import * as actionTypes from './actionTypes';

export const getLaunches = (pagination, type = 'all') => async dispatch => {
  const queryString = `?filter=_id,flight_number,mission_name,links/mission_patch_small,rocket/rocket_name,launch_date_utc,launch_site/site_name_long&sort=flight_number&order=desc&limit=${pagination.limit}&offset=${pagination.offset}&id=true`;

  dispatch({ type: actionTypes.SET_LAUNCH_LOADING });
  try {
    let res;
    if (type === 'upcoming') {
      res = await axios.get(
        `https://api.spacexdata.com/v3/launches/upcoming/${queryString}`
      );
    } else if (type === 'past') {
      res = await axios.get(
        `https://api.spacexdata.com/v3/launches/past/${queryString}`
      );
    } else {
      res = await axios.get(
        `https://api.spacexdata.com/v3/launches/${queryString}`
      );
    }

    dispatch({
      type: actionTypes.GET_LAUNCHES,
      payload: { count: +res.headers['spacex-api-count'], data: res.data }
    });
    dispatch({ type: actionTypes.REMOVE_LAUNCH_LOADING });
  } catch (err) {
    dispatch({
      type: actionTypes.LAUNCH_ERROR,
      payload: err
    });
    dispatch({ type: actionTypes.REMOVE_LAUNCH_LOADING });
  }
};

export const getLaunch = id => async dispatch => {
  try {
    dispatch({ type: actionTypes.SET_LAUNCH_LOADING });
    const res = await axios.get(`https://api.spacexdata.com/v3/launches/${id}`);

    dispatch({
      type: actionTypes.GET_LAUNCH,
      payload: res.data
    });
    dispatch({ type: actionTypes.REMOVE_LAUNCH_LOADING });
  } catch (err) {
    dispatch({
      type: actionTypes.LAUNCH_ERROR,
      payload: err
    });
    dispatch({ type: actionTypes.REMOVE_LAUNCH_LOADING });
  }
};

export const setCurrentPage = page => dispatch => {
  dispatch({
    type: actionTypes.SET_CURRENT_PAGE,
    payload: page
  });
};
