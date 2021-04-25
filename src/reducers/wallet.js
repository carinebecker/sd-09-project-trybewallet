const INITIAL_STATE = {
  expenses: [], /*
  total: 0, */
};

const addExpense = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, ...action.payload] };
  case 'SUM_EXPENSES':
    return { ...state, total: parseFloat((state.total + action.payload).toFixed(2)) };
  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload) };
  /* case 'SUB_EXPENSE':
    return { ...state, total: parseFloat((state.total - action.payload).toFixed(2)) }; */
  default:
    return state;
  }
};

export default addExpense;
