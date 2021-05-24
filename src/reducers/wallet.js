import { SAVE_EXPENSE_INFO, ERASE_EXPENSE } from '../actions/actionTypes';

const initialState = {
  expenses: [],
  currencies: [],
  totalValue: 0,
};

const wallet = (state = initialState, action) => {
  const info = action.expenseInfo;
  const id = action.expenseId;
  switch (action.type) {
  case SAVE_EXPENSE_INFO:
    return { ...state, expenses: [...state.expenses, info] };
  case ERASE_EXPENSE: {
    const eraseFilter = state.expenses.filter((expense) => expense.id !== id);
    return { ...state, expenses: eraseFilter };
  }
  default:
    return state;
  }
};

export default wallet;
