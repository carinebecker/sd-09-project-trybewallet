import {
  SAVE_WALLET,
  REMOVE_ITEM,
  EDIT_EXPENSE,
  UPDATE_EXPENSE,
  SAVE_CURRENCIES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_WALLET:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case REMOVE_ITEM:
    return ({
      ...state,
      expenses: [...state.expenses.slice(0, action.payload),
        ...state.expenses.slice(action.payload + 1, state.expenses.length)],
    });
  case EDIT_EXPENSE:
    return { ...state, expenseEdit: action.payload };
  case UPDATE_EXPENSE:
    return { ...state,
      expenses: state.expenses.map((expense) => ((
        expense.id === action.expense.id) ? action.expense : expense)),
    };
  case SAVE_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  default:
    return state;
  }
};

export default user;
