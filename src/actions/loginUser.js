import { LOGIN_USER } from './index';

export default function loginUser(email) {
  return {
    type: LOGIN_USER,
    payload: {
      email,
    },
  };
}
