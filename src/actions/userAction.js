import { ADD_USER } from './actionTypes';

const addUser = (email) => ({
  type: ADD_USER,
  email,
});

export default addUser;
