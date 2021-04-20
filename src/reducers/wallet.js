import {
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  RECEIVE_CURRENCIES,
  REQUEST_CURRENCIES,
  SUBMIT_EXPENSE,
  UPDATE_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  editor: false,
  idToEdit: 0,
  isFetching: false,
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT_EXPENSE:
    return { ...state,
      expenses: [...state.expenses, {
        id: action.id,
        value: action.value,
        description: action.description,
        currency: action.currency,
        method: action.method,
        tag: action.tag,
        exchangeRates: action.exchangeRates,
      }] };
  case DELETE_EXPENSE:
    return { ...state, expenses: [...action.expenses], editor: false, idToEdit: 0 };
  case EDIT_EXPENSE:
    return { ...state, id: action.id, editor: action.editor };
  case UPDATE_EXPENSES:
    return { ...state, expenses: [...action.expenses], editor: false, idToEdit: 0 };
  case REQUEST_CURRENCIES:
    return { ...state, isFetching: true };
  case RECEIVE_CURRENCIES:
    return { ...state, currencies: [...action.currencies], isFetching: false };
  default:
    return state;
  }
};

export default wallet;
