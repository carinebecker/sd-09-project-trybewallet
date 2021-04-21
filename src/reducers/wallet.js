// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  IS_FETCHING,
  SAVES_CURRENCY_LIST,
  SAVES_EXPENSE,
  SET_GLOBAL_STATE,
  UPDATES_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  error: '',
  currencyData: [],
  isEdit: false,
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
  case UPDATES_EXPENSE:
    return {
      ...state,
      expenses: [...payload],
    };
  case SET_GLOBAL_STATE:
    return {
      ...state,
      isEdit: !(state.isEdit),
    };
  default:
    return state;
  }
};

export default wallet;
