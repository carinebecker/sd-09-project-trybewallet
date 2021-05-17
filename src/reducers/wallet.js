// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  RECEIVE_PRICE,
  SAVE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  console.log(state);
  switch (action.type) {
  case RECEIVE_PRICE:
    return { ...state, currencies: action.data };
  case SAVE_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.data] };
  default:
    return state;
  }
}

export default wallet;
