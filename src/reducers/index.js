import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
import logStatus from './loggedStatus';
import inputHandler from './inputHandler';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
const rootReducer = combineReducers({ user, wallet, logStatus, inputHandler });

export default rootReducer;
