import { ADD_EXPENSE, ERROR_EXPENSE, SET_EXPENSE, EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const reducerDispesas = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      currencies: action.moedas,
      expenses: [...state.expenses, {
        ...action.dispesaAtual,
        exchangeRates: action.moedas,
      }],
    };
  case SET_EXPENSE:
    return {
      ...state,
      expenses: action.expenses,
    };
  case ERROR_EXPENSE:
    return {
      ...state,
      error: action.error,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      ...action.expenses,
    };
  default:
    return state;
  }
};

export default reducerDispesas;
