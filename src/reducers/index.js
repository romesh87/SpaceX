import { combineReducers } from 'redux';

import launch from './launch';
import auth from './auth';
import alert from './alert';
import UI from './UI';

const rootReducer = combineReducers({ launch, auth, alert, UI });

export default rootReducer;
