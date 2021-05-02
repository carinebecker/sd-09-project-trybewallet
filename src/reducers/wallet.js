// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { SET_CURRENCIES,
  SET_EXPENSE,
  SET_TOTAL_EXPENSE,
  UPDATE_EXPENSES,
  SET_EDIT_MODE,
} from '../actions';

const INITIAL_WALLET_STATE = {
  currencies: [],
  expenses: [],
  totalExpense: 0,
  edit: {
    editable: false,
    id: 0,
  },
};

const wallet = (state = INITIAL_WALLET_STATE, action) => {
  switch (action.type) {
  case SET_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case SET_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case SET_TOTAL_EXPENSE:
    return {
      ...state,
      totalExpense: action.totalExpense,
    };
  case UPDATE_EXPENSES:
    return {
      ...state,
      expenses: action.expenses,
    };
  case SET_EDIT_MODE:
    return {
      ...state,
      edit: action.edit,
    };
  default:
    return state;
  }
};

export default wallet;
