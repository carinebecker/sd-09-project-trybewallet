// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { AGROUP_CURRENCIES,
  ADD_EXPENSE, SUM_EXPENSES,
  SUBTRACT_EXPENSES,
  DELETE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0.00,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case AGROUP_CURRENCIES:
    return { ...state, currencies: action.payload };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, ...action.payload] };
  case SUM_EXPENSES:
    return { ...state, total: parseFloat((state.total + action.payload).toFixed(2)) };
  case SUBTRACT_EXPENSES:
    return { ...state, total: parseFloat((state.total - action.payload).toFixed(2)) };
  case DELETE_EXPENSES:
    return { ...state, expenses: [...state.expenses, ...action.payload] };
  default:
    return state;
  }
};

export default wallet;
