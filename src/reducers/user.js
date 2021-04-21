// Esse reducer será responsável por tratar as informações da pessoa usuária
import GET__EMAIL from '../actions/actionTypes';

const INITIAL_USER_EMAIL = {
  email: '',
};

const userEmail = (state = INITIAL_USER_EMAIL, action) => {
  switch (action.type) {
  case GET__EMAIL:
    return {
      email: action.email,
    };
  default:
    return state;
  }
};

export default userEmail;
