import { combineReducers } from 'redux';

import modal from './modal';
import user from './user';
import pane from "./pane";
import expense from "./expense";

const rootReducer = combineReducers({
    // put here your reducers
    modal,
    user,
    pane,
    expense
});

export default rootReducer;