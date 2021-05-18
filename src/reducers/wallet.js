// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  PREPEND_EXPENSES,
  DELETE_EXPENSE,
  IS_EDITING_EXPENSE,
} from '../actions/index';

const INITIAL_EXPENSES_STATE = {
  expenses: [],
  isEditing: false,
};

// https://medium.com/swlh/few-ways-to-update-a-state-array-in-redux-reducer-f2621ae8061
const expenses = (state = INITIAL_EXPENSES_STATE, action) => {
  switch (action.type) {
  case PREPEND_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((currExpense) => currExpense.id !== action.payload),
    };
  case IS_EDITING_EXPENSE:
    return {
      ...state,
      isEditing: action.payload,
    };
  default:
    return state;
  }
};

export default expenses;
