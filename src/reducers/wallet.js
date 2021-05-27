import {
  ADD_EXPENSE,
  EDIT_EXPENSE,
  UPDATE_EXPENSE,
  DELETE_EXPENSE,
  CURRENCIES_VALUES_START,
  CURRENCIES_VALUES_SUCCESS,
  CURRENCIES_VALUES_ERROR,
} from '../actions';

const INITIAL_STATE = {
  counterId: 0,
  editId: 0,
  currencies: [],
  expenses: [],
  isFetching: false,
  editor: false,
  error: '',
};

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_EXPENSE: {
    const expenseNew = { ...payload, id: state.counterId };
    return {
      ...state,
      expenses: [...state.expenses, expenseNew],
      counterId: state.counterId + 1,
    };
  }
  case DELETE_EXPENSE: {
    return {
      ...state, expenses: state.expenses.filter((expense) => expense.id !== payload),
    };
  }
  case EDIT_EXPENSE: {
    return {
      ...state, editor: true, editId: payload,
    };
  }
  case UPDATE_EXPENSE: {
    return {
      expenses: state.expenses.map((expense) => {
        if (expense.id === state.editId) {
          return { ...expense, ...payload };
        }
        return expense;
      }),
      editor: false,
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
