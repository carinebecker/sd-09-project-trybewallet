// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { AGROUP_CURRENCIES,
  ADD_EXPENSE, SUM_EXPENSES,
  SUBTRACT_EXPENSES,
  DELETE_EXPENSE,
  SEND_TO_EDIT,
  FINISH_EDIT } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0.00,
  isEditing: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case AGROUP_CURRENCIES:
    return { ...state, currencies: action.payload };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, ...action.payload] };
  case SUM_EXPENSES:
    return { ...state, total: parseFloat((state.total + action.payload).toFixed(2)) };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  case SUBTRACT_EXPENSES:
    return { ...state, total: parseFloat((state.total - action.payload).toFixed(2)) };
  case SEND_TO_EDIT:
    return ({
      ...state,
      expenseToEdit: action.expense,
      isEditing: true,
    });
  case FINISH_EDIT:
    return ({
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.expense.id) {
          return ({ ...expense, ...action.expense });
        }
        return expense;
      }),
      isEditing: false,
    });
  default:
    return state;
  }
};
export default wallet;

// CONSULTEI REPOSITÓRIO DO COLEGA MARCELO CAMPOS PARA ME AJUDAR A RESOLVER REQUISITO 7.
// TINHA UM ERRO NA FUNÇÃO DO REDUCER
