import {
  SAVE_USER_DATA,
  SAVE_EXPENSE_DATA,
  REMOVE_EXPENSE_DATA,
  REQUEST_CURRENCY_TYPES,
  RECEIVE_CURRENCY_TYPES_FAILURE,
  RECEIVE_CURRENCY_TYPES_SUCCESS,
} from './actionTypes';

import awesomeApiEndPoint from '../services/awesomeApi';

export const saveUserData = (user) => ({
  type: SAVE_USER_DATA,
  email: user.email,
  password: user.password,
});

export const saveExpenseData = (expense) => ({
  type: SAVE_EXPENSE_DATA,
  expenses: expense,
});

export const removeExpenseData = (expenses) => ({
  type: REMOVE_EXPENSE_DATA,
  expenses,
});

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
  };
};

export function fetchCurrencyTypes() {
  return (dispatch) => {
    dispatch(requestCurrencyTypes());
    return awesomeApiEndPoint.getCurrencyTypes()
      .then(
        (data) => dispatch(receiveCurrencyTypesSuccess(data)),
        (error) => dispatch(receiveCurrencyTypesFailure(error.message)),
      );
  };
}
