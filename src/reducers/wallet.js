// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  RECEIVE_PRICE,
  SAVE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  data: {},
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case RECEIVE_PRICE:
    return { ...state, currencies: Object.keys(action.data), data: action.data };
  case SAVE_EXPENSE:
    return { ...state,
      expenses: [...state.expenses,
        { ...action.data, exchangeRates: state.data }] };
  default:
    return state;
  }
}

export default wallet;
