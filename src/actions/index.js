import {
  SAVE_USER_DATA,
  SAVE_EXPENSE_DATA,
  REQUEST_CURRENCY_DATA,
  RECEIVE_CURRENCY_DATA_FAILURE,
  RECEIVE_CURRENCY_DATA_SUCCESS,
  REQUEST_CURRENCY_TYPES,
  RECEIVE_CURRENCY_TYPES_FAILURE,
  RECEIVE_CURRENCY_TYPES_SUCCESS,
} from './actionTypes';

import getCurrencyTypes from '../services/awesomeApi';

export const saveUserData = (user) => ({
  type: SAVE_USER_DATA,
  email: user.email,
  password: user.password,
});

export const saveExpenseData = (expense) => ({
  type: SAVE_EXPENSE_DATA,
  expenses: expense,
});

// export const getExpenseData = ()

const requestCurrencyTypes = () => ({
  type: REQUEST_CURRENCY_TYPES,
});

const receiveCurrencyTypesFailure = (error) => ({
  type: RECEIVE_CURRENCY_TYPES_FAILURE,
  error,
});

const receiveCurrencyTypesSuccess = (data) => {
  const currencyTypes = data.map(({ code }) => code);
  return {
    type: RECEIVE_CURRENCY_TYPES_SUCCESS,
    currencies: currencyTypes,
  }
};

const requestCurrencyData = () => ({
  type: REQUEST_CURRENCY_DATA,
});

const receiveCurrencyDataFailure = (error) => ({
  type: RECEIVE_CURRENCY_DATA_FAILURE,
  error,
});

const receiveCurrencyDataSuccess = (data) => ({
  type: RECEIVE_CURRENCY_DATA_SUCCESS,
  currencies: data,
});

export function fetchCurrencyTypes() {
  return (dispatch) => {
    dispatch(requestCurrencyTypes());
    return getCurrencyTypes()
      .then(
        (data) => dispatch(receiveCurrencyTypesSuccess(data)),
        (error) => dispatch(receiveCurrencyTypesFailure(error.message)),
      );
  };
}

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(requestCurrencyData());
    return getCurrencyTypes()
      .then(
        (data) => dispatch(receiveCurrencyDataSuccess(data)),
        (error) => dispatch(receiveCurrencyDataFailure(error.message)),
      );
  };
}
