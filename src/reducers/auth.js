import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_UP:
    case actionTypes.SIGN_IN:
    case actionTypes.LOAD_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };

    case actionTypes.SIGN_OUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false
      };

    case actionTypes.AUTH_ERROR:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
