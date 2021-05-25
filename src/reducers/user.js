import { SET_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
  password: '',
};

const user = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SET_USER:
    return {
      ...state, email: payload.email, password: payload.password,
    };
  default:
    return state;
  }
};

export default user;
