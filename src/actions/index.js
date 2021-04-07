// Coloque aqui suas actions
export const ADD_EMAIL_STATE = 'ADD_EMAIL_STATE';
export const ADD_TOTAL_PRICE = 'ADD_TOTAL_PRICE';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const ADD_EXPENSES_STATE = 'ADD_EXPENSES_STATE';

// USER
export const addEmailState = (email) => ({
  type: ADD_EMAIL_STATE,
  email,
});

// TOTAL PRICE
export const addTotalPriceState = (totalPrice) => ({
  type: ADD_TOTAL_PRICE,
  totalPrice,
});

// WALLET
const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  currencies,
});

const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  error,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    try {
      dispatch(requestCurrencies());

      const endpoint = 'https://economia.awesomeapi.com.br/json/all';
      const response = await fetch(endpoint);
      const json = await response.json();

      delete json.USDT;
      return (dispatch(receiveCurrencies(Object.keys(json))));
    } catch (error) {
      return dispatch(failedRequest(error));
    }
  };
}

// EXPENSES
export const addExpensesState = (expenses) => ({
  type: ADD_EXPENSES_STATE,
  expenses,
});
