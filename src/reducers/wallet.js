export const REQUEST_MONEY = 'REQUEST_MONEY';
export const WALLET_INFO = 'WALLET_INFO';
export const MONEY_INFO = 'MONEY_INFO';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDITED_EXPENSE = 'EDITED_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

const initialState = {
  currencies: [],
  expenses: [],
  isFetching: false,
  isEditing: false,
  item: {},
};

function wallet(state = initialState, action) {
  const { type, isFetching, money, expenses, isEditing, item } = action;
  switch (type) {
  case WALLET_INFO:
    return {
      ...state,
      expenses: [...state.expenses, expenses],
      isFetching: false,
    };
  case MONEY_INFO:
    return { ...state, currencies: money, isFetching };
  case REQUEST_MONEY:
    return { ...state, isFetching };
  case DELETE_EXPENSE: {
    const filteredExpenses = state.expenses.filter((e) => e.id !== expenses.id);
    return { ...state, expenses: filteredExpenses };
  }
  case EDIT_EXPENSE:
    return { ...state, isEditing, item };
  case EDITED_EXPENSE: {
    const expense = state.expenses.find((e, i) => {
      if (e.id === expenses.id) {
        e.index = i;
        return e;
      }
      return false;
    });
    state.expenses[expense.index] = expenses;
    return { ...state, isEditing: false };
  }
  default:
    return state;
  }
}

export default wallet;
