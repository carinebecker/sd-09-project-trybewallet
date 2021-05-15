import awesomeAPI from '../services/awesomeAPI';

export const LOGIN = 'LOGIN';
export const FETCH_CURRENCY = 'FETCH_CURRENCY';
export const FETCH_ERROR = 'FETCH_ERROR';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDIT_EXPENSE_SAVE = 'EDIT_EXPENSE_SAVE';

export const doLogin = ({ email, password }) => ({
  type: LOGIN,
  email,
  password,
});

export const fetchCurrency = (currencies) => ({
  type: FETCH_CURRENCY,
  currencies,
});

export const fetchError = (error) => ({
  type: FETCH_ERROR,
  error,
});

export const addExpenses = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const deleteExpense = (expenses) => ({
  type: DELETE_EXPENSE,
  expenses,
});

export const editExpense = (expense) => ({
  type: EDIT_EXPENSE,
  expense,
  isEditing: true,
});

export const editExpenseSave = (expense) => ({
  type: EDIT_EXPENSE_SAVE,
  expense,
  isEditing: false,
});

export const fetchAwesomeAPI = () => (
  (dispatch) => (
    awesomeAPI().then(
      (response) => dispatch(fetchCurrency(response)),
      (error) => dispatch(fetchError(error)),
    )));
