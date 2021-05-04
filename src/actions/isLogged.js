import { IS_LOGGED } from './index';

export default function isLogged() {
  return {
    type: IS_LOGGED,
    payload: {
      isLogged: true,
    },
  };
}
