import fetchAPI from '../services/index';

export const userLogin = (email) => ({
  type: 'USER_LOGIN',
  email,
});

export const fetchCurrency = (currencies) => ({
  type: 'FETCH_CURRENCY',
  currencies,
});

export const addExpenses = (expense) => ({
  type: 'ADD_EXPENSE',
  expense,
});

export const deleteExpense = (expenses) => ({
  type: 'DELETE_EXPENSE',
  expenses,
});

export const editExpense = (expense) => ({
  type: 'EDIT_EXPENSE',
  expense,
  isEditing: true,
});

export const editExpenseSave = (expense) => ({
  type: 'EDIT_EXPENSE_SAVE',
  expense,
  isEditing: false,
});

export const fetchAPIcurrencies = () => (
  (dispatch) => (
    fetchAPI().then(
      (response) => dispatch(fetchCurrency(response)),
      (error) => console.log(error),
    )));
