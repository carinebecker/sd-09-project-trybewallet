import { EMAIL_USER } from '../actions';

const INITIAL_USER_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_USER_STATE, action) => {
  switch (action.type) {
  case EMAIL_USER:
    return {
      ...state,
      email: action.email,
    };

  default:
    return state;
  }
};

export default userReducer;
