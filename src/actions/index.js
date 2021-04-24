// Coloque aqui suas actions
export const LOGIN = 'LOGIN';

export const loginAction = (email, senha) => {
  return {
    type: LOGIN,
    email,
    senha,
  };
};
