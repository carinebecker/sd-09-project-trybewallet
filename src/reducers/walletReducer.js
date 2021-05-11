// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_CURRENCY, GET_CURRENCY, ADD_EXPENSE } from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCY:
    return {
      ...state,
      isFetching: true,
    };
  case GET_CURRENCY:
    return {
      ...state,
      currencies: action.currencies,
      isFetching: false,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: action.expenses.id,
          value: action.expenses.value,
          description: action.expenses.description,
          currency: action.expenses.currency,
          method: action.expenses.method,
          tag: action.expenses.tag,
          exchangeRates: action.expenses.exchangeRates,
        },
      ],
    };
  default:
    return state;
  }
}

export default wallet;
