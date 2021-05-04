import {
  ADD_EXPENSE,
  ERROR_EXPENSE,
  SET_EXPENSE,
  EDIT_EXPENSE,
  SET_ID,
  EDIT_ID,
  EDITING_OLD_ELEMENT,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  id: '',
  editingOldElement: false,
};

const reducerDispesas = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      currencies: action.moedas,
      expenses: [...state.expenses, {
        ...action.dispesaAtual,
        exchangeRates: action.moedas,
      }],
    };
  case SET_EXPENSE:
    return {
      ...state,
      expenses: action.expenses,
    };
  case ERROR_EXPENSE:
    return {
      ...state,
      error: action.error,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses
        .map((element) => (element.id === action.id ? action.expense : element))],
    };
  case EDIT_ID:
    return {
      ...state,
      id: action.id,
    };
  case SET_ID:
    return {
      ...state,
      id: state.id + 1,
    };
  case EDITING_OLD_ELEMENT:
    return {
      ...state,
      editingOldElement: !state.editingOldElement,
    };
  default:
    return state;
  }
};

export default reducerDispesas;
