import * as actionTypes from '../actions/actionTypes';

const initialState = {
  launches: null,
  launch: null,
  loading: true,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LAUNCHES:
      return {
        ...state,
        launches: action.payload,
        loading: false
      };

    case actionTypes.LAUNCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
