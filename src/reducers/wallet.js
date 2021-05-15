// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SAVE_EXPENSE_INFO } from '../actions/actionTypes';

const initialState = {
  expenses: [],
  currencies: [],
};

const wallet = (state = initialState, action) => {
  const info = action.expenseInfo;
  switch (action.type) {
  case SAVE_EXPENSE_INFO:

    return { ...state, expenses: [...state.expenses, info] };
  default:
    return state;
  }
};

export default wallet;
