import { EXPENSE_SAVE, EXPENSE_DELETE, GET_EXPENSE, EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  setExpenses: {},
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EXPENSE_SAVE:
    return { ...state, expenses: [...state.expenses, action.expenseDetails] };
  case EXPENSE_DELETE:
    return { ...state, expenses: [...action.updatedExpense] };
  case GET_EXPENSE:
    return { ...state, setExpenses: action.getExpenseDetails };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: [...action.editedExpenses],
      setExpenses: {},
    };
  default:
    return state;
  }
}

export default wallet;
