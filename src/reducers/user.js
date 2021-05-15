import * as SAVE_EMAIL from '../actions/userAction';

const initialState = {};

function user(state = initialState, action) {
  const email = action.user;
  switch (action.type) {
  case SAVE_EMAIL:
    return { email };
  default:
    return state;
  }
}

export default user;
