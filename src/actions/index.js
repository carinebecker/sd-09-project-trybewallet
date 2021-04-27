import getCurrencyApi from '../services/currenciesApi';

// Coloque aqui suas actions
export const userEmailDispatch = (email) => ({
  type: 'USER_EMAIL_DISPATCH',
  email,
});

export const editingItem = () => ({ type: 'EDITING_ITEM' });

export const requestCurrency = (currencies) => ({
  type: 'REQUEST_CURRENCY',
  currencies,
});

export const fetchCurrency = () => (dispatch) => {
  getCurrencyApi()
    .then((response) => {
      delete response.USDT;
      dispatch(requestCurrency(Object.keys(response)));
    });
};

export const addNewExpense = (expense) => ({
  type: 'NEW_EXPENSE',
  expense,
});

export const fetchCurrencyExpense = (expense) => (dispatch) => {
  getCurrencyApi()
    .then((response) => {
      delete response.USDT;
      dispatch(addNewExpense({ ...expense, exchangeRates: response }));
    });
};

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

export const deleteExpense = (expenses) => ({
  type: 'DELETE_EXPENSE',
  expenses,
});

export const setEdit = (condition, expense) => ({
  type: 'SET_EDIT',
  condition,
  expense,
});

export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses,
});

export const editExpense = (expense, id) => ({
  type: 'EDIT_EXPENSE',
  expense,
  id,
});

export const editId = (id) => ({
  type: 'EDIT_ID',
  id,
});

export const setSequenceId = () => ({
  type: 'SET_SEQUENCE_ID',
});
