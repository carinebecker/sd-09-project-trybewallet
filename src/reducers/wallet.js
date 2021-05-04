import {
  GET_CURRENCY,
  REQUEST_CURRENCY,
  FAIL_REQUEST,
  ADD_EXPENSES,
  DELETE_EXPENSE,
  ADD_EDITIONS,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  error: '',
};

export default function expensesReducerAction(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCY:
    return {
      ...state,
      currencies: state.currencies.concat(action.payload),
      isFetching: false,
    };
  case REQUEST_CURRENCY:
    return { ...state, isFetching: true };
  case FAIL_REQUEST:
    return {
      ...state,
      error: action.payload,
      isFetching: false,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, { ...action.payload }],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...action.payload],
    };
  case ADD_EDITIONS:
    return {
      ...state,
      expenses: state.expenses.map((elem) => {
        if (elem.id === action.payload.id) {
          return action.payload.handlingInputs[0];
        }
        return elem;
      }),
    };
  default:
    return state;
  }
}
