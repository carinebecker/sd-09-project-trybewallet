// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { WALLET, REQUEST_CURRENCIES_SUCCESS, REQUEST_CURRENCIES,
  DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  isFetching: '',
  currencies: [],
  expenses: [],
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
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.expenses,
    };
  default:
    return state;
  }
};

export default wallet;
