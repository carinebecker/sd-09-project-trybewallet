import {
  ADD_EXPENSE,
  EDIT_EXPENSE,
  RECEIVE_CURRENCIES,
  UPDATE_EXPENSES,
  UPDATE_TOTAL,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isEditing: false,
  isFetching: true,
  total: '0.00',
  expenseIndex: 0,
  editableExpense: {},
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_CURRENCIES:
    return { ...state, currencies: action.currencies, isFetching: false };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.expense] };
  case EDIT_EXPENSE:
    return {
      ...state,
      editableExpense: action.editableExpense,
      expenseIndex: action.expenseIndex,
      isEditing: true,
    };
  case UPDATE_EXPENSES:
    return { ...state, expenses: action.expenses, isEditing: false };
  case UPDATE_TOTAL:
    return { ...state, total: action.total };
  default: return state;
  }
};

export default wallet;
