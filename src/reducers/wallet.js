import { DELETE_ROW, EDIT_BTN, SAVE_FORMS, SEND_EDITION } from '../actions/index';

const INITIAL_STATE = {
  expenses: [],
  key: false,
  index: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_FORMS:
    return { ...state,
      expenses: [...state.expenses, { exchangeRates: action.exchange,
        ...action.state }] };

  case DELETE_ROW:
    return {
      ...state,
      expenses: state.expenses.filter((included) => included.id !== action.id),
    };

  case EDIT_BTN:
    return {
      ...state,
      key: action.key,
      index: action.index,
    };

  case SEND_EDITION:
    state.expenses[state.index] = action.expenses;
    return {
      ...state,
      expenses: [...state.expenses],
    };

  default:
    return state;
  }
};

export default wallet;
