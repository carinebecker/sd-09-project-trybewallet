// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_CURRENCY':
    return {
      ...state,
      currencies: action.currencies,
    };
  case 'ADD_NEW_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, action.expenseObj],
    };
  case 'SET_TOTAL':
    return {
      ...state,
      total: action.total,
    };
  case 'REMOVE_TABLE_ITEM':
    return {
      ...state,
      expenses: action.expenses,
      total: action.total,
    };
  default:
    return state;
  }
};

export default wallet;
