export const CREATE_EMAIL = 'CORRECT_EMAIL';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const SAVE_ATT_EXPENSES = 'SAVE_ATT_EXPENSES';
export const DELETE_ITEMS = 'DELETE_ITEMS';
export const ENABLE_BTN = 'ENABLE_BTN';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const userEmail = (email) => ({
  type: CREATE_EMAIL,
  email,
});

export const saveExpenses = (expenses) => ({
  type: SAVE_EXPENSES,
  expenses,
});

export const saveAttExpenses = (data, exchangeRates) => ({
  type: SAVE_ATT_EXPENSES,
  data,
  exchangeRates,
});

export const deleteExpense = (id) => ({
  type: DELETE_ITEMS,
  id,
});

export const enableBtn = (bool, index) => ({
  type: ENABLE_BTN,
  bool,
  index,
});

export const editExpense = (expenses) => ({
  type: EDIT_EXPENSE,
  expenses,
});

export const saveExpensesThunk = (data) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const exchangeRates = await response.json();
  return dispatch(saveAttExpenses(data, exchangeRates));
};
