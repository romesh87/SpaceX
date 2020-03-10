import * as actionTypes from '../actions/actionTypes';

const initialState = {
  launches: null,
  resultsCount: null,
  currentPageNumber: 1,
  currentPageResults: [],
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
        resultsCount: action.payload.length,
        loading: false
      };

    case actionTypes.SET_CURRENT_PAGE:
      const offset = (action.payload.page - 1) * action.payload.itemsPerPage;

      return {
        ...state,
        currentPageNumber: action.payload.page,
        currentPageResults: state.launches.slice(
          offset,
          offset + action.payload.itemsPerPage
        ),
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
