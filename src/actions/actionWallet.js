export const SET_WALLET = 'SET_WALLET';

export const setWallet = (currencies, expenses) => ({
  type: SET_WALLET,
  exchange: {
    currencies,
    expenses,
  },
});
