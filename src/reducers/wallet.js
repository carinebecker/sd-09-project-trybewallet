// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  PREPEND_EXPENSES,
  DELETE_EXPENSE,
  IS_EDITING,
} from '../actions/index';

const INITIAL_EXPENSES_STATE = {
  expenses: [],
  isEditing: false,
  currentEdit: {},
};

// https://medium.com/swlh/few-ways-to-update-a-state-array-in-redux-reducer-f2621ae8061
const expenses = (state = INITIAL_EXPENSES_STATE, {
  type,
  expense,
  payload,
  currEdit,
}) => {
  console.log(`reducer: ${currEdit}`);
  switch (type) {
  case PREPEND_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, expense],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((currExpense) => currExpense.id !== payload),
    };
  case IS_EDITING:
    return {
      ...state,
      isEditing: !state.isEditing,
      currentEdit: state.expenses.find((exp) => currEdit === exp.id),
    };
  default:
    return state;
  }
};

export default expenses;
