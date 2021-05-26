// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_CURRENCY_ACTION,
  SET_EXPENSES_ACTION,
  SET_FILTER_EXPENSES_ACTION,
} from '../actions';

const INITIAL_STATE = {
  currency: {},
  expenses: [],
};

export default function currencyReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCY_ACTION:
    return {
      ...state,
      currency: action.currency,
    };
  case SET_EXPENSES_ACTION:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case SET_FILTER_EXPENSES_ACTION:
    return {
      ...state,
      expenses: [...action.filterExpenses],
    };
  default:
    return state;
  }
}
