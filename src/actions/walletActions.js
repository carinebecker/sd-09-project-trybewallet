import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  IS_EDITING,
  RECEIVE_CURRENCIES_SUCCESS,
  RECEIVE_CURRENCIES_FAILURE,
  UPDATE_EXPENSES,
} from './actionTypes';

import getCurrenciesAPI from '../services/currenciesAPI';

export const receiveCurrenciesSucces = (currencies) => ({
  type: RECEIVE_CURRENCIES_SUCCESS,
  currencies,
});

export const receiveCurrenciesFailure = (error) => ({
  type: RECEIVE_CURRENCIES_FAILURE,
  error,
});

export const addExpense = (expenses) => ({
  type: ADD_EXPENSE,
  expenses,
});

export const editExpense = (expenseId) => ({
  type: EDIT_EXPENSE,
  expenseId,
});

export const updateExpenses = (expenses) => ({
  type: UPDATE_EXPENSES,
  expenses,
});

export const editing = (isEditing) => ({
  type: IS_EDITING,
  isEditing,
});

export const deleteExpense = (expenses, total) => ({
  type: DELETE_EXPENSE,
  expenses,
  total,
});

export function fetchCurrencies() {
  return (dispatch) => {
    getCurrenciesAPI()
      .then((currencies) => dispatch(receiveCurrenciesSucces(currencies)))
      .catch((error) => dispatch(receiveCurrenciesFailure(error)));
  };
}
