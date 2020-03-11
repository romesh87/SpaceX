import * as actionTypes from '../actions/actionTypes';

const initialState = {
  sideDrawerVisible: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_SIDEDRAWER:
      return {
        ...state,
        sideDrawerVisible: !state.sideDrawerVisible
      };
    default:
      return state;
  }
};

export default reducer;
