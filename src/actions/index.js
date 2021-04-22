export const SET_USER = 'SET_USER';

export const setUser = (email, password) => ({
  type: SET_USER,
  email,
  password,
});
