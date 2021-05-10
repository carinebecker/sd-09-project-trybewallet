import requestAPI from '../api/requestAPI';

export const GET_USER_EMAIL = 'GET_USER_EMAIL';
export const getUserEmail = (email) => ({
  type: GET_USER_EMAIL,
  userEmail: email,
});

export const PREPEND_EXPENSES = 'PREPEND_EXPENSES';
export const prependExpenses = (data) => ({
  type: PREPEND_EXPENSES,
  expense: data,
});

// https://medium.com/swlh/few-ways-to-update-a-state-array-in-redux-reducer-f2621ae8061
// export const APPEND_EXPENSES = 'APPEND_EXPENSES';
// export const appendExpenses = (data) => ({
//   type: APPEND_EXPENSES,
//   expenses: data,
// });

// export const REQUEST_EXCHANGES = 'REQUEST_EXCHANGES';
// export const requestExchanges = () => ({ type: REQUEST_EXCHANGES });

export const RECIEVE_EXCHANGES = 'RECIEVE_EXCHANGES';
export const recieveExchanges = (exchanges) => ({
  type: RECIEVE_EXCHANGES,
  exchangeRates: exchanges,
});

export function fetchExchanges() {
  return (dispatch) => requestAPI()
    .then((exchanges) => dispatch(recieveExchanges(exchanges)))
    .catch((error) => console.log(error));
}
