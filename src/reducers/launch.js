import * as actionTypes from '../actions/actionTypes';

const initialState = {
  launches: null,
  resultsCount: null,
  currentPageNumber: 1,
  launch: null,
  loading: true,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LAUNCHES:
      return {
        ...state,
        launches: action.payload.data,
        resultsCount: action.payload.count,
        loading: false
      };

    case actionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPageNumber: action.payload,
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
