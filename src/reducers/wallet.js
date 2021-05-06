import { SAVE_ATT_EXPENSES } from '../actions/index';

const INITIAL_STATE = {
  expenses: [],
};

const saveExpenses = (state = INITIAL_STATE, action) => {
  const { expenses } = state;
  switch (action.type) {
  case SAVE_ATT_EXPENSES:
    return { ...state,
      expenses: [...expenses, { exchangeRates: action.exchangeRates, ...action.data }] };
  default:
    return state;
  }
};

export default saveExpenses;
