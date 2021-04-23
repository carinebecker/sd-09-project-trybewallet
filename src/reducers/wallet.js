const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_CURRENCY':
    return { ...state, currencies: action.payload };
  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, action.payload] };
  case 'DELETE_EXPENSE':
    return { ...state, expenses: [...action.payload] };
  case 'EDIT_EXPENSE':
    return { ...state, expense: action.payload };
  case 'UPDATE_EXPENSE':
    return { ...state,
      expenses: state.expenses.map((_expense) => ((
        _expense.id === action.expense.id) ? action.expense : _expense)),
    };
  default:
    return state;
  }
};

export default walletReducer;
