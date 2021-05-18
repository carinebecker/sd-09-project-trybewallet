// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  IS_EDITING_EXPENSE,
  EDIT_EXPENSE,
} from '../actions/index';

const INITIAL_EXPENSES_STATE = {
  expenses: [],
  isEditing: false,
};

// https://medium.com/swlh/few-ways-to-update-a-state-array-in-redux-reducer-f2621ae8061
const expenses = (state = INITIAL_EXPENSES_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((currExpense) => currExpense.id !== action.payload),
    };
  case IS_EDITING_EXPENSE:
    return {
      ...state,
      isEditing: action.payload,
    };
  case EDIT_EXPENSE: {
    const foundId = state.expenses.find((exp) => action.payload.id === exp.id);
    const newArray = [...state.expenses];
    newArray[foundId.id] = action.payload;
    return {
      ...state,
      expenses: newArray,
    };
  }
  default:
    return state;
  }
};

export default expenses;
