const INITIAL_STATE = {
  total: 0,
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SET_TOTAL':
    return { ...state, total: action.total };
  case 'SET_EXPENSE':
    return { ...state, expenses: [...state.expenses, action.expense] };
  default:
    return state;
  }
}

export default walletReducer;
