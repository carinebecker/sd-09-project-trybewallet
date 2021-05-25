const INITIAL_STATE = {
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SET_EXPENSE':
    return { ...state, expenses: [...state.expenses, action.expense] };
  case 'DEL_EXPENSE':
    return { expenses: state.expenses.filter((item) => item.id !== action.payload) };
  default:
    return state;
  }
}

export default walletReducer;
