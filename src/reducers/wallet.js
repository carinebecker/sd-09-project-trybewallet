import {
  SAVE_ATT_EXPENSES, DELETE_ITEMS, ENABLE_BTN, EDIT_EXPENSE } from '../actions/index';

const INITIAL_STATE = {
  expenses: [],
  keyBtn: false,
  index: 0,
};

const saveExpenses = (state = INITIAL_STATE, action) => {
  const { expenses, index } = state;
  switch (action.type) {
  case SAVE_ATT_EXPENSES:
    return { ...state,
      expenses: [...expenses, { exchangeRates: action.exchangeRates, ...action.data }] };
  case DELETE_ITEMS:
    return { ...state,
      expenses: expenses.filter((newExpenses) => newExpenses.id !== action.id) };
  case ENABLE_BTN:
    return { ...state, keyBtn: action.bool, index: action.index };
  case EDIT_EXPENSE:
    expenses[index] = action.expenses;
    return { ...state,
      expenses: [...expenses] };
  default:
    return state;
  }
};

export default saveExpenses;
