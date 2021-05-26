// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  SAVE_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SAVE_EDITED_EXPENSE,
  GET_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  expenseInEdition: {},
  inEdition: false,
  currencies: [] };

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.expense,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenseInEdition: action.expense,
      inEdition: action.expenseInEdition,
    };
  case SAVE_EDITED_EXPENSE:
    return {
      ...state,
      expenses: action.expense,
      expenseInEdition: {},
      inEdition: false,
    };
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  default:
    return state;
  }
};

export default wallet;
