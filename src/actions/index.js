// Coloque aqui suas actions
export const LOGIN = 'LOGIN';

export const loginAction = (email, senha) => ({ type: LOGIN, email, senha });
