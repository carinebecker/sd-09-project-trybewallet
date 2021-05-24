// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES, ADD_EXPENSES } from '../actions/action.wallet';
import DELETE_EXPENSES from '../actions/action.delete';
import EDIT_EXPENSE from '../actions/action.edit';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editExpense: null,
};

const userWallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: action.expenses,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: action.expenses,
      editExpense: null,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editExpense: action.expense,
    };
  default:
    return state;
  }
};

export default userWallet;
