// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { FETCH_CURRENCY, ADD_EXPENSES, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

function addExpense(state = {}, actions = {}) {
  const expenses = state.expenses.concat([{
    id: state.expenses.length, ...actions.expense,
  }]);
  return {
    ...state,
    expenses,
    total: expenses.reduce((acc, cur) => {
      const rate = cur.exchangeRates[cur.currency];
      acc += parseFloat((parseFloat(cur.value) * rate.ask).toFixed(2));
      return acc;
    }, 0),
  };
}

function wallet(state = INITIAL_STATE, actions) {
  switch (actions.type) {
  case FETCH_CURRENCY:
    return {
      ...state,
      currencies: actions.currencies,
    };

  case ADD_EXPENSES:
    return addExpense(state, actions);

  case DELETE_EXPENSE:
    return { ...state, expenses: [...actions.expenses] };

  default:
    return state;
  }
}

export default wallet;
