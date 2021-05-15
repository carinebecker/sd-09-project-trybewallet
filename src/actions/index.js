import awesomeAPI from '../services/awesomeAPI';

export const LOGIN = 'LOGIN';
export const FETCH_CURRENCY = 'FETCH_CURRENCY';
export const FETCH_ERROR = 'FETCH_ERROR';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

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
  type: ADD_EXPENSES,
  expense,
});

export const deleteExpense = (expenses) => ({
  type: DELETE_EXPENSE,
  expenses,
});

export const fetchAwesomeAPI = () => (
  (dispatch) => (
    awesomeAPI().then(
      (response) => dispatch(fetchCurrency(response)),
      (error) => dispatch(fetchError(error)),
    )));
