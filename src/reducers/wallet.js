import { SAVE_FORMS } from '../actions/index';

const INITIAL_STATE = {
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_FORMS:
    return { ...state,
      expenses: [...state.expenses, { exchangeRates: action.exchange,
        ...action.state }] };
  default:
    return state;
  }
};

export default wallet;
