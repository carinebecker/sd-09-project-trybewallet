import { SAVE_ATT_EXPENSES, DELETE_ITEMS } from '../actions/index';

const INITIAL_STATE = {
  expenses: [],
};

const saveExpenses = (state = INITIAL_STATE, action) => {
  const { expenses } = state;
  switch (action.type) {
  case SAVE_ATT_EXPENSES:
    return {
      expenses: [...expenses, { exchangeRates: action.exchangeRates, ...action.data }] };
  case DELETE_ITEMS:
    return {
      expenses: expenses.filter((newExpenses) => newExpenses.id !== action.id) };
  default:
    return state;
  }
};

export default saveExpenses;
