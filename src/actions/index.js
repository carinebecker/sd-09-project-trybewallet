// Coloque aqui suas actions
export const SET_EMAIL = 'SET_EMAIL';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const GET_CURRENCY = 'GET_CURRENCY';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const setEmail = (email) => ({
  type: SET_EMAIL,
  email,
});

const requestCurrency = () => ({
  type: REQUEST_CURRENCY,
});

const getCurrency = (currency) => ({
  type: GET_CURRENCY,
  currencies: currency,
});

export function fetchCurrency() {
  return (dispatch) => {
    dispatch(requestCurrency());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((json) => {
        const values = Object.values(json);
        return dispatch(getCurrency(values));
      });
  };
}

export const updateExpenses = (obj) => ({
  type: ADD_EXPENSE,
  expenses: obj,
});
