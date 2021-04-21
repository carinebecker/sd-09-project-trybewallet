import { ENDPOINT } from '../services/currencyData';
// Coloque aqui suas actions
export const SAVES_USER_EMAIL = 'SAVES_USER_EMAIL';
export const SAVES_CURRENCY_LIST = 'SAVES_CURRENCY_LIST';
export const IS_FETCHING = 'IS_FETCHING';
export const SAVES_EXCHANGE_RATE = 'SAVES_EXCHANGE_RATE';
export const SAVES_EXCHANGE_RATE_FAILS = 'SAVES_EXCHANGE_RATE_FAILS';
export const SAVES_EXPENSE = 'SAVES_EXPENSE';
export const FETCH_CURRENCY_DATA_FAILS = 'FETCH_CURRENCY_DATA_FAILS';
export const UPDATES_EXPENSE = 'UPDATES_EXPENSE';
export const SET_GLOBAL_STATE = 'SET_GLOBAL_STATE';

export const savesUserEmail = (userEmail) => ({
  type: SAVES_USER_EMAIL,
  payload: userEmail,
});

export const savesCurrencyList = (currencies) => ({
  type: SAVES_CURRENCY_LIST,
  payload: currencies,
});

export const savesExpense = (expenseData) => ({
  type: SAVES_EXPENSE,
  payload: expenseData,
});

export const isFetching = () => ({
  type: IS_FETCHING,
});

export const fetchCurrencyDataFails = (error) => ({
  type: FETCH_CURRENCY_DATA_FAILS,
  payload: error,
});

export const fetchCurrencyData = (expenseData) => (dispatch) => {
  dispatch(isFetching());
  fetch(ENDPOINT)
    .then((response) => response.json())
    .then(
      (response) => {
        delete response.USDT;
        dispatch(savesExpense({
          ...expenseData,
          exchangeRates: response,
        }));
      },
      (error) => fetchCurrencyDataFails(error),
    );
};

export const updatesExpense = (filteredExpenses) => ({
  type: UPDATES_EXPENSE,
  payload: filteredExpenses,
});

export const setGlobalState = () => ({
  type: SET_GLOBAL_STATE,
});
