import { REQUEST_EXCHANGE_RATES,
  SET_EXPENSE_SUCCESS,
  REQUEST_EXCHANGE_RATES_ERROR,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  UPDATE_EXPENSE,
  SET_CURRENCY_SUCCESS }
  from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  edit: {
    id: 0,
    isEditable: false,
  },
};

function walletReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case SET_CURRENCY_SUCCESS:
    return { ...state,
      isFetching: payload.isFetching,
      currencies: payload.currencies,
    };
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
  case EDIT_EXPENSE:
    return {
      ...state,
      edit: {
        id: payload.id,
        isEditable: payload.isEditable,
      },
    };
  case UPDATE_EXPENSE:
    return {
      ...state,
      expenses: payload.expenses,
      edit: {
        isEditable: payload.isEditable,
      },
    };
  default:
    return state;
  }
}

export default walletReducer;
