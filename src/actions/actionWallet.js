import getApi from '../services/requestApi';

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const CURRENCIES_VALUES_START = 'CURRENCIES_VALUES_START';
export const CURRENCIES_VALUES_SUCCESS = 'CURRENCIES_VALUES_SUCCESS';
export const CURRENCIES_VALUES_ERROR = 'CURRENCIES_VALUES_ERROR';

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const updateExpense = (expense) => ({
  type: UPDATE_EXPENSE,
  payload: expense,
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  payload: id,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

const currenciesValues = () => ({
  type: CURRENCIES_VALUES_START,
  payload: { isFetching: true },
});

const currenciesValuesSuccess = (currencies) => ({
  type: CURRENCIES_VALUES_SUCCESS,
  payload: {
    currencies,
    isFetching: false,
  },
});

const currenciesValuesError = (error) => ({
  type: CURRENCIES_VALUES_ERROR,
  payload: {
    error,
    isFetching: false,
  },
});

export const fetchCurrenciesValues = () => async (dispatch) => {
  dispatch(currenciesValues());
  try {
    const getCurrenciesValues = await getApi();
    dispatch(currenciesValuesSuccess(getCurrenciesValues));
  } catch (error) {
    dispatch(currenciesValuesError(error));
  }
};
