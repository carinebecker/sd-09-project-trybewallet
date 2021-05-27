// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_CURRENCY_ACTION,
  SET_EXPENSES_ACTION,
  SET_FILTER_EXPENSES_ACTION,
  SET_EDIT_EXPENSES_ACTION,
  SET_BOOLEAN_EDIT_ACTION,
  SET_UPDATE_EXPENSES_ACTION,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editExpenses: {},
  booleanEdit: false,
};

export default function currencyReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCY_ACTION:
    return {
      ...state,
      currencies: action.currency,
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
  case SET_UPDATE_EXPENSES_ACTION:
    return {
      ...state,
      expenses: [...action.updateExpenses],
    };
  case SET_EDIT_EXPENSES_ACTION:
    return {
      ...state,
      editExpenses: action.editExpenses,
    };
  case SET_BOOLEAN_EDIT_ACTION:
    return {
      ...state,
      booleanEdit: action.booleanEdit,
    };
  default:
    return state;
  }
}
