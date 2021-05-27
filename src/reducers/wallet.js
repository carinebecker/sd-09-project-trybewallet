import {
  SET_EDIT_MODE,
  SET_EXPENSE,
  DELETE_EXPENSE,
  REQUEST_CURRENCIES,
  REQUEST_CURRENCIES_SUCCESS,
  REQUEST_CURRENCIES_ERROR,
} from '../actions';

const INITAL_STATE = { currencies: [], expenses: [], editMode: false };

const walletReducer = (state = INITAL_STATE, { type, payload }) => {
  switch (type) {
  case SET_EDIT_MODE:
    return {
      ...state,
      editMode: payload.editMode,
      id: payload.id,
    };
  case SET_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.concat(payload.expense),
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: payload.expenses,
    };
  case REQUEST_CURRENCIES:
    return {
      ...state,
      isFetching: payload.isFetching,
    };
  case REQUEST_CURRENCIES_SUCCESS:
    return {
      ...state,
      isFetching: payload.isFetching,
      currencies: payload.currencies,
    };
  case REQUEST_CURRENCIES_ERROR:
    return {
      ...state,
      isFetching: payload.isFetching,
      error: payload.error,
    };
  default:
    return state;
  }
};

export default walletReducer;
