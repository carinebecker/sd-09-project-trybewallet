import { SAVE_WALLET, REMOVE_ITEM } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_WALLET:
    return {
      ...state,
      currencies: action.currencies,
      expenses: [...state.expenses, action.expenses],
    };
  case REMOVE_ITEM:
    return ({
      ...state,
      expenses: [...state.expenses.slice(0, action.payload),
        ...state.expenses.slice(action.payload + 1, state.expenses.length)],
    });
  default:
    return state;
  }
};

export default user;
