import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  RECEIVE_CURRENCIES_SUCCESS,
  RECEIVE_CURRENCIES_FAILURE,
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

export const addExpense = (expenses, total) => ({
  type: ADD_EXPENSE,
  expenses,
  total,
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
