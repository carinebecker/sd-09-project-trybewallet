import getCurrencyApi from '../services/currenciesApi';

// Coloque aqui suas actions
export const userEmailDispatch = (email) => ({
  type: 'USER_EMAIL_DISPATCH',
  email,
});

export const requestCurrency = (currencies) => ({
  type: 'REQUEST_CURRENCY',
  currencies,
});

export const fetchCurrency = () => (dispatch) => {
  getCurrencyApi()
    .then((response) => dispatch(requestCurrency(response)));
};

export const addNewExpense = (name, value) => ({
  type: 'NEW_EXPENSE',
  name,
  value,
});

export const setDataToGlobalState = (expenseObj) => ({
  type: 'ADD_NEW_EXPENSE',
  expenseObj,
});

export const setTotalValue = (total) => ({
  type: 'SET_TOTAL',
  total,
});

export const setExpenseValue = () => ({
  type: 'DEFAULT_VALUE',
  default: 0,
});

export const deleteItemFromState = (expenses, id, newTotal) => {
  const newExpenses = expenses
    .filter((expense) => expense.id !== id);
  return ({
    type: 'REMOVE_TABLE_ITEM',
    expenses: newExpenses,
    total: newTotal,
  });
};

export const setNewId = () => ({
  type: 'SET_ID',
});

export const editExpense = (id, editor) => ({
  type: 'EDIT_EXPENSE',
  id,
  editor,
});

export const deleteExpense = (expenses) => ({
  type: 'DELETE_EXPENSE',
  expenses,
});
