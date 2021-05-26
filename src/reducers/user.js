const INITAL_STATE = { email: '' };

const userReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case 'SET_EMAIL':
    return {
      ...state,
      email: action.payload.email,
    };
  default:
    return state;
  }
};

export default userReducer;
