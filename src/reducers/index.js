import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
import enableEditReducer from './enableEditReducer';

const rootReducers = combineReducers({
  user,
  wallet,
  enableEditReducer,
});

export default rootReducers;
