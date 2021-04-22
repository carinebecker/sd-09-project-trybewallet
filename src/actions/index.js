import fetchExchange from '../services/api';
import { LOGIN, REQUEST_EXCHANGE_RATES,
  SET_EXPENSE_SUCCESS,
  REQUEST_EXCHANGE_RATES_ERROR,
  REMOVE_EXPENSE } from './actionTypes';

export const login = (credentials) => ({ type: LOGIN, credentials });

const requestExchangeRates = () => ({
  type: REQUEST_EXCHANGE_RATES,
  payload: {
    isFetching: true,
  },
});

const setExpenseSuccess = (expense, currencies) => ({
  type: SET_EXPENSE_SUCCESS,
  payload: { expense,
    currencies,
    isFetching: false,
  },
});

const requestExchangeRatesError = (error) => ({
  type: REQUEST_EXCHANGE_RATES_ERROR,
  payload: { error,
    isFetching: false,
  },
});

export const removeExpense = (item) => ({
  type: REMOVE_EXPENSE,
  payload: { item,
  },
});

export const setExpense = (expense) => (dispatch) => {
  dispatch(requestExchangeRates());
  fetchExchange().then(
    (currencies) => {
      expense.exchangeRates = currencies;
      return dispatch(setExpenseSuccess(expense, currencies));
    },
    (error) => dispatch(requestExchangeRatesError(error)),
  );
};
