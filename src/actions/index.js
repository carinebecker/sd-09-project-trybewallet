import getCurrenciesAPI from '../services';

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_USER = 'ADD_USER';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
export const UPDATE_TOTAL = 'UPDATE_TOTAL';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const addUser = (email) => ({ type: ADD_USER, email });

export const updateExpenses = (expenses) => ({ type: UPDATE_EXPENSES, expenses });

export const updateTotal = (total) => ({ type: UPDATE_TOTAL, total });

export const editExpense = (editableExpense, expenseIndex) => ({
  type: EDIT_EXPENSE,
  editableExpense,
  expenseIndex,
});

export const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  currencies,
});

export function fetchCurrencies() {
  return (dispatch) => {
    getCurrenciesAPI().then((curr) => dispatch(receiveCurrencies(Object.keys(curr))));
  };
}

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});
