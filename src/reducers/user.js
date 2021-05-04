// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOGIN_USER':
    return {
      ...state,
      email: action.payload.email,
    };
  default:
    return state;
  }
}
