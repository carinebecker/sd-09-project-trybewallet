// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { WALLET, REQUEST_CURRENCIES_SUCCESS, REQUEST_CURRENCIES,
  CHANGE_EXPENSE, CHANGE_BUTTON_EDIT, CHANGE_BUTTON_ADD } from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  currencies: {},
  expenses: [],
  actionButton: false,
  idEdit: null,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case REQUEST_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: action.currencies,
      isFetching: false,
    };
  case REQUEST_CURRENCIES:
    return ({
      ...state,
      isFetching: true,
    });
  case CHANGE_EXPENSE:
    return {
      ...state,
      expenses: action.expenses,
    };
  case CHANGE_BUTTON_EDIT:
    return {
      ...state,
      actionButton: true,
      idEdit: action.idEdit,
    };
  case CHANGE_BUTTON_ADD:
    return {
      ...state,
      actionButton: false,
    };
  default:
    return state;
  }
};

export default wallet;
