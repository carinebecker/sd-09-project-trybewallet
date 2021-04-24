// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN } from '../actions';

const initialState = {
  user: {
    email: '',
  },
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      user: {
        ...state.user,
        email: action.email,
      },
    };
  default:
    return state;
  }
};

export default user;
