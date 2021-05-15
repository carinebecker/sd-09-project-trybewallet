import { SET_WALLET } from '../actions/actionWallet';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, { type, exchange }) => {
  switch (type) {
  case SET_WALLET:
    return {
      ...state, currencies: exchange.currencies, expenses: exchange.expenses,
    };
  default:
    return state;
  }
};

export default wallet;
