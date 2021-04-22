// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_CURRENCY, INPUT_WALLET, UPDATE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCY:
    return {
      ...state,
      currencies: action.response,
    };
  case INPUT_WALLET:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case UPDATE_EXPENSES:
    console.log(state);
    return {
      ...state,
      expenses: [action.expenses],
    };
  default:
    return state;
  }
};
export default wallet;
