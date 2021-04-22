import { REQUEST_EXCHANGE_RATES,
  SET_EXPENSE_SUCCESS,
  REQUEST_EXCHANGE_RATES_ERROR,
  REMOVE_EXPENSE }
  from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
};

function walletReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case REQUEST_EXCHANGE_RATES:
    return { ...state,
      isFetching: payload.isFetching,
    };
  case SET_EXPENSE_SUCCESS:
    return { ...state,
      currencies: payload.currencies,
      isFetching: payload.isFetching,
      expenses: [...state.expenses, payload.expense],
    };
  case REQUEST_EXCHANGE_RATES_ERROR:
    return {
      currencies: payload.error,
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense !== payload.item),
    };
  default:
    return state;
  }
}

export default walletReducer;
