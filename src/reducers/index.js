import { combineReducers } from 'redux';

import movies from './movie';
import auth from './auth';
import alert from './alert';

const rootReducer = combineReducers({ movies, auth, alert });

export default rootReducer;
