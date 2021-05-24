const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
  isEditing: false,
};

function addExpense(state = {}, action = {}) {
  const expenses = state.expenses.concat([{
    id: state.expenses.length, ...action.expense,
  }]);
  return {
    ...state,
    expenses,
    total: expenses.reduce((acc, cur) => {
      const rate = cur.exchangeRates[cur.currency];
      acc += parseFloat((parseFloat(cur.value) * rate.ask).toFixed(2));
      return acc;
    }, 0),
  };
}

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'FETCH_CURRENCY':
    return {
      ...state,
      currencies: action.currencies,
    };

  case 'ADD_EXPENSE':
    return addExpense(state, action);

  case 'DELETE_EXPENSE':
    return { ...state,
      expenses: [...action.expenses],
    };

  case 'EDIT_EXPENSE':
    return {
      ...state,
      isEditing: action.isEditing,
      expense: action.expense,
    };

  case 'EDIT_EXPENSE_SAVE':
    return { ...state,
      expenses: [
        action.expense,
        ...state.expenses.filter((item) => item.id !== action.expense.id),
      ],
      isEditing: action.isEditing,
    };

  default:
    return state;
  }
}

export default wallet;
