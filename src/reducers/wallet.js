import {
  ADD_EXPENSE,
  // EDIT_EXPENSE,
  DELETE_EXPENSE,
  CURRENCIES_VALUES_START,
  CURRENCIES_VALUES_SUCCESS,
  CURRENCIES_VALUES_ERROR,
} from '../actions';

const INITIAL_STATE = {
  contadorID: 0,
  currencies: [],
  expenses: [],
  isFetching: false,
  error: '',
};

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_EXPENSE: {
    const novaDespesa = { ...payload, id: state.contadorID };
    return {
      ...state,
      expenses: [...state.expenses, novaDespesa],
      contadorID: state.contadorID + 1,
    };
  }
  case DELETE_EXPENSE: {
    return {
      ...state, expenses: state.expenses.filter((expense) => expense.id !== payload),
    };
  }
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
