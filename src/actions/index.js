const SET_EMAIL = 'SET_EMAIL';

const setEmail = (email) => ({
  type: SET_EMAIL,
  payload: {
    email,
  },
});

export default setEmail;
