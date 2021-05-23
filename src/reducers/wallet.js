// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES, ADD_EXPENSES } from '../actions/action.wallet';
import EDIT_EXPENSES from '../actions/action.edit';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const userWallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case EDIT_EXPENSES:
    return {
      ...state,
      expenses: action.expenses,
    };

  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  default:
    return state;
  }
};

export default userWallet;
