// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { PREPEND_EXPENSES, DELETE_EXPENSE } from '../actions/index';

const INITIAL_EXPENSES_STATE = {
  expenses: [],
};
// https://medium.com/swlh/few-ways-to-update-a-state-array-in-redux-reducer-f2621ae8061
const expenses = (state = INITIAL_EXPENSES_STATE, { type, expense, payload }) => {
  switch (type) {
  case PREPEND_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, expense],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((currExpense) => currExpense.id !== payload),
    };
  default:
    return state;
  }
};

export default expenses;
