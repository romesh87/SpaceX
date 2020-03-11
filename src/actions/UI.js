import * as actionTypes from './actionTypes';

export const toggleSideDrawer = () => dispatch => {
  dispatch({
    type: actionTypes.TOGGLE_SIDEDRAWER
  });
};
