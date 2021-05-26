import { SAVE_EXPENSE_INFO, ERASE_EXPENSE, UPDATE_INFO,
  SAVE_CURRENCIES } from '../actions/actionTypes';

const initialState = {
  expenses: [],
  currencies: [],
  totalValue: 0,
};

const wallet = (state = initialState, action) => {
  const info = action.expenseInfo;
  const id = action.expenseId;
  const upInfo = action.updatedExpenseInfo;
  const currency = action.currencies;
  switch (action.type) {
  case SAVE_EXPENSE_INFO:
    return { ...state, expenses: [...state.expenses, info] };
  case ERASE_EXPENSE: {
    const eraseFilter = state.expenses.filter((expense) => expense.id !== id);
    return { ...state, expenses: eraseFilter };
  }
  case UPDATE_INFO:
    return { ...state, expenses: upInfo };
  case SAVE_CURRENCIES:
    return { ...state, currencies: currency };
  default:
    return state;
  }
};

export default wallet;
