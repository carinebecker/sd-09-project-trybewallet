// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  DELETE_EXPENSE,
  RECEIVE_PRICE,
  SAVE_EXPENSE,
  EDIT_EXPENSE,
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
  case DELETE_EXPENSE:
    return { ...state,
      exchangeRatesTemp:
        state.expenses.filter(({ id }) => id === action.id)[0].exchangeRates,
      expenses: [...state.expenses.filter(({ id }) => id !== action.id)] };
  case EDIT_EXPENSE:
    return { ...state,
      expenses: [...state.expenses,
        { ...action.data, exchangeRates: state.exchangeRatesTemp, id: action.idToEdit }],
      exchangeRatesTemp: {} };
  default:
    return state;
  }
}

export default wallet;
