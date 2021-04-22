// import user from './user';
// import wallet from './wallet';
import { combineReducers } from 'redux';
import user from './user';

const rootReducers = combineReducers({ user });

export default rootReducers;
