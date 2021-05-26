const INITIAL_STATE = {
  expenses: [],
  expenseToEdit: {},
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SET_EXPENSE':
    return { ...state, expenses: [...state.expenses, action.expense] };
  case 'DEL_EXPENSE':
    return { expenses: state.expenses.filter((item) => item.id !== action.payload) };
  case 'GET_EDIT_EXPENSE':
    return { ...state, expenseToEdit: action.expEdit };
  case 'EDIT_EXPENSE':
    return { ...state, expenses: action.ExpEditList, expenseToEdit: {} };
  default:
    return state;
  }
}

export default walletReducer;
