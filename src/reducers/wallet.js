import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  IS_EDITING,
  RECEIVE_CURRENCIES_SUCCESS,
  RECEIVE_CURRENCIES_FAILURE,
  UPDATE_EXPENSES,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  expenseId: 0,
  isEditing: false,
  isFetching: true,
  error: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_CURRENCIES_SUCCESS:
    return { ...state, currencies: action.currencies, isFetching: false };

  case RECEIVE_CURRENCIES_FAILURE:
    return { ...state, error: action.error, isFetching: false };

  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.expenses] };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...action.expenses],
      total: (parseFloat(state.total) - parseFloat(action.total)).toFixed(2),
    };

  case EDIT_EXPENSE:
    return { ...state, expenseId: action.expenseId };

  case UPDATE_EXPENSES:
    return { ...state, expenses: action.expenses };

  case IS_EDITING:
    return { ...state, isEditing: action.isEditing };

  default: return state;
  }
};

export default wallet;
