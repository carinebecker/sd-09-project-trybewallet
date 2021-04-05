// Esse reducer será responsável por tratar as informações da pessoa usuária
const LOGIN = 'LOGIN';

const USER_INITIAL_STATE = { email: '' };

const userReducer = (state = USER_INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return ({
      ...state,
      email: action.email,
    });
  default:
    return state;
  }
};

export default userReducer;
