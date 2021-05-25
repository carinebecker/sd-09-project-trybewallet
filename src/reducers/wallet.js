import {
  ADD_EXPENSE,
  CURRENCIES_VALUES_START,
  CURRENCIES_VALUES_SUCCESS,
  CURRENCIES_VALUES_ERROR,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  error: '',
};

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_EXPENSE:
    return {
      ...state, expenses: [...state.expenses, payload.expense],
    };
  case CURRENCIES_VALUES_START:
    return {
      ...state, isFetching: payload.isFetching,
    };
  case CURRENCIES_VALUES_SUCCESS:
    return {
      ...state, currencies: payload.currencies, isFetching: payload.isFetching,
    };
  case CURRENCIES_VALUES_ERROR:
    return {
      ...state, error: payload.error, isFetching: payload.isFetching,
    };
  default:
    return state;
  }
};

export default wallet;
