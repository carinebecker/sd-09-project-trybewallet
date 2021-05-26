export const ADD_EXPENSE = 'NEW_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const SET_EXCHANGE_RATES = 'SET_EXCHANGE_RATES';
export const EDITE_EXPENSE = 'EDITE_EXPENSE';
export const POST_EDITING = 'POST_EDITING';

export const addExpense = (expenses) => ({
  type: ADD_EXPENSE,
  expenses,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export const setExchangeRates = (currencies, exchangeRates) => ({
  type: SET_EXCHANGE_RATES,
  currencies,
  exchangeRates,
});

export const editeExpense = (id) => ({
  type: EDITE_EXPENSE,
  id,
});

export const postEditing = (expense) => ({
  type: POST_EDITING,
  expense,
});

export const economyAPI = () => async (dispatch) => {
  const currencyAPI = 'https://economia.awesomeapi.com.br/json/all';
  const exchangeRates = await fetch(currencyAPI)
    .then((response) => response.json())
    .then((json) => json);
  const currencies = Object.keys(exchangeRates)
    .filter((coin) => coin !== 'USDT')
    .map((coin) => coin);
  dispatch(setExchangeRates(currencies, exchangeRates));
};
