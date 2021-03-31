import { ADD_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSE:
    return { expenses: [
      ...state.expenses,
      {
        id: state.expenses.length,
        ...action.expense,
      },
    ] };
  default:
    return state;
  }
}
