import * as Api from '../services/Api';

export const LOGGED_IN = 'LOGGED_IN';
export const SUBMIT_EXPENSE = 'SUBMIT_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';

export const loggedInAction = (email) => ({
  type: LOGGED_IN,
  email,
});

export const submitExpense = ({
  id,
  value,
  description,
  currency,
  method,
  tag,
  exchangeRates,
}) => ({
  type: SUBMIT_EXPENSE,
  id,
  value,
  description,
  currency,
  method,
  tag,
  exchangeRates,
});

export const deleteExpense = (expenses) => ({
  type: DELETE_EXPENSE,
  expenses,
});

export const editExpense = (id, editor) => ({
  type: EDIT_EXPENSE,
  id,
  editor,
});

export const updateExpenses = (expenses) => ({
  type: UPDATE_EXPENSES,
  expenses,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  currencies,
});

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return Api.getCurrencies()
      .then((currencies) => dispatch(receiveCurrencies(currencies)));
  };
}
