const INITIAL_STATE = {
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SET_EXPENSE':
    return { ...state, expenses: [...state.expenses, action.expense] };
  case 'DEL_EXPENSE':
    return { ...state, expenses: state.expenses.splice(action.index, 1) };
  default:
    return state;
  }
}

export default walletReducer;
