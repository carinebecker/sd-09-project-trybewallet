// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
  id: '',
  sequenceId: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_CURRENCY':
    return {
      ...state,
      currencies: action.currencies,
    };
  case 'NEW_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
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
  case 'SET_EXPENSES':
    return {
      ...state,
      expenses: action.expenses,
    };
  case 'EDIT_ID':
    return {
      ...state,
      id: action.id,
    };
  case 'EDIT_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses.map((item) => {
        if (item.id === action.id) return action.expense;
        return item;
      })],
    };
  default:
    return state;
  }
};

export default wallet;
