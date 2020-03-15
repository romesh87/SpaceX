import axios from 'axios';
import firebase from '../firebase';

import * as actionTypes from './actionTypes';

export const getLaunches = (pagination, type = 'all') => async dispatch => {
  const queryString = `?filter=_id,flight_number,mission_name,links/mission_patch_small,rocket/rocket_name,launch_date_utc,launch_site/site_name_long&sort=flight_number&order=desc&limit=${pagination.limit}&offset=${pagination.offset}&id=true`;

  dispatch({ type: actionTypes.SET_LAUNCH_LOADING });
  try {
    let res;
    let count;
    if (type === 'upcoming') {
      res = await axios.get(
        `https://api.spacexdata.com/v3/launches/upcoming/${queryString}`
      );
    } else if (type === 'past') {
      res = await axios.get(
        `https://api.spacexdata.com/v3/launches/past/${queryString}`
      );
    } else if (type === 'favourite') {
      const user = await firebase.auth().currentUser;
      const userInfo = await firebase
        .firestore()
        .collection('users')
        .where(firebase.firestore.FieldPath.documentId(), '==', user.uid)
        .get();

      const data = userInfo.docs[0].data();

      const promises = data.favouriteLaunches.map(async id => {
        const favLaunch = await axios.get(
          `https://api.spacexdata.com/v3/launches/?flight_id=${id}&filter=_id,flight_number,mission_name,links/mission_patch_small,rocket/rocket_name,launch_date_utc,launch_site/site_name_long&sort=flight_number&order=desc&id=true`
        );
        return favLaunch;
      });

      const resArray = await Promise.all(promises);
      if (resArray) {
        count = resArray.length;
        res = {};
        res.data = resArray
          .map(el => el.data[0])
          .splice(pagination.offset, pagination.limit);
      }
      console.log('res.data', res.data);
    } else {
      res = await axios.get(
        `https://api.spacexdata.com/v3/launches/${queryString}`
      );
    }

    dispatch({
      type: actionTypes.GET_LAUNCHES,
      payload: {
        count: res.headers ? +res.headers['spacex-api-count'] : count,
        data: res.data
      }
    });
    dispatch({ type: actionTypes.REMOVE_LAUNCH_LOADING });
  } catch (err) {
    console.error(err);
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

export const setLaunchesType = type => dispatch => {
  dispatch({
    type: actionTypes.SET_LAUNCHES_TYPE,
    payload: type
  });
};

export const loadFavourites = ids => async dispatch => {
  try {
    const promises = ids.map(async id => {
      const favLaunch = await await axios.get(
        `https://api.spacexdata.com/v3/launches/?flight_id=${id}`
      );
      return favLaunch;
    });

    const favLaunches = await Promise.all(promises);

    dispatch({
      type: actionTypes.LOAD_FAVOURITES,
      payload: { data: favLaunches, count: favLaunches.length }
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: actionTypes.LAUNCH_ERROR,
      payload: err
    });
  }
};
