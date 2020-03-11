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
        resultsCount: action.payload.count
      };

    case actionTypes.GET_LAUNCH:
      return {
        ...state,
        launch: action.payload
      };

    case actionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPageNumber: action.payload
      };

    case actionTypes.SET_LAUNCH_LOADING:
      return {
        ...state,
        loading: true
      };

    case actionTypes.REMOVE_LAUNCH_LOADING:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
