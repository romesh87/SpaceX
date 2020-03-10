import axios from 'axios';

import * as actionTypes from './actionTypes';

export const getLaunches = (pagination, type = 'all') => async dispatch => {
  const queryString = `?filter=_id,flight_number,mission_name,links/mission_patch_small,rocket/rocket_name,launch_date_utc,launch_site/site_name_long&sort=flight_number&order=desc&limit=${pagination.limit}&offset=${pagination.offset}&id=true`;

  const queryString2 = `?id=true&limit=3`;

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

    console.log(res);

    dispatch({
      type: actionTypes.GET_LAUNCHES,
      payload: { count: +res.headers['spacex-api-count'], data: res.data }
    });
  } catch (err) {
    dispatch({
      type: actionTypes.LAUNCH_ERROR,
      payload: err
    });
  }
};

export const setCurrentPage = page => dispatch => {
  dispatch({
    type: actionTypes.SET_CURRENT_PAGE,
    payload: page
  });
};
