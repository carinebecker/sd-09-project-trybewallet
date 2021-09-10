// Esse reducer será responsável por tratar as informações da pessoa usuária

import { GET_USER_EMAIL } from '../actions/index';

const INITIAL_USER_EMAIL_STATE = {
  email: 'Usuário não identificado',
};

const user = (state = INITIAL_USER_EMAIL_STATE, { type, userEmail }) => {
  switch (type) {
  case GET_USER_EMAIL:
    return {
      ...state,
      email: userEmail,
    };
  default:
    return state;
  }
};

export default user;
