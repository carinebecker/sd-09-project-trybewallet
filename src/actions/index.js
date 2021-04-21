// Coloque aqui suas actions
// chaves USER e WALLET no estado global
export const USER = 'USER';
export const WALLET = 'WALLET';

export const loginUser = (email) => ({
  type: USER,
  email,
});

export const walletCreate = (expenses) => ({
  type: WALLET,
  expenses });
