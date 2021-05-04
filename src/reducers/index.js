import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
import loggedStatus from './loggedStatus';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
const rootReducer = combineReducers({ user, wallet, loggedStatus });

export default rootReducer;
