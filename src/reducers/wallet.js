// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  IS_FETCHING,
  SAVES_CURRENCY_LIST,
  SAVES_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  error: '',
  currencyData: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
  case SAVES_CURRENCY_LIST:
    return {
      ...state,
      currencies: [...payload],
    };
  case SAVES_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.concat(payload),
      isFetching: false,
    };
  case IS_FETCHING:
    return {
      ...state,
      isFetching: true,
    };
  default:
    return state;
  }
};

export default wallet;
