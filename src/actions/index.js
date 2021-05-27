// Coloque aqui suas actions
export const USER_EMAIL = 'USER_EMAIL';
export const GET_CURRENCY_ACTION = 'GET_CURRENCY_ACTION';
export const SET_EXPENSES_ACTION = 'SET_EXPENSES_ACTION';
export const SET_FILTER_EXPENSES_ACTION = 'SET_FILTER_EXPENSES_ACTION';
export const SET_EDIT_EXPENSES_ACTION = 'SET_EDIT_EXPENSES_ACTION';
export const SET_BOOLEAN_EDIT_ACTION = 'SET_BOOLEAN_EDIT_ACTION';
export const SET_UPDATE_EXPENSES_ACTION = 'SET_UPDATE_EXPENSES_ACTION';

export const userEmail = (email) => ({
  type: USER_EMAIL,
  email,
});

export const getCurrencyAction = (currency) => ({
  type: GET_CURRENCY_ACTION,
  currency,
});

export const setExpensesAction = (expenses) => ({
  type: SET_EXPENSES_ACTION,
  expenses,
});

export const setFilterExpensesAction = (filterExpenses) => ({
  type: SET_FILTER_EXPENSES_ACTION,
  filterExpenses,
});

export const setUpdateExpensesAction = (updateExpenses) => ({
  type: SET_UPDATE_EXPENSES_ACTION,
  updateExpenses,
});

export const setEditExpensesAction = (editExpenses) => ({
  type: SET_EDIT_EXPENSES_ACTION,
  editExpenses,
});

export const setBooleanEditAction = (booleanEdit) => ({
  type: SET_BOOLEAN_EDIT_ACTION,
  booleanEdit,
});
