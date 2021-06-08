import { combineReducers } from 'redux';

import modal from './modal';
import user from './user';
import pane from "./pane";

const rootReducer = combineReducers({
    // put here your reducers
    modal,
    user,
    pane
});

export default rootReducer;