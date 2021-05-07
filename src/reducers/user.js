// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SAVE_USER_DATA } from '../actions/actionTypes';

const INITIAL_USER_STATE = {
  email: '',
  password: '',
};

const user = (state = INITIAL_USER_STATE, action) => {
  switch (action.type) {
  case SAVE_USER_DATA:
    return {
      ...state,
      email: action.email,
      password: action.password,
    };
  default:
    return state;
  }
};

export default user;
