import { combineReducers } from 'redux';

import launch from './launch';
import auth from './auth';
import alert from './alert';

const rootReducer = combineReducers({ launch, auth, alert });

export default rootReducer;
