import requestAPI from '../api/requestAPI';

export const GET_USER_EMAIL = 'GET_USER_EMAIL';
export const getUserEmail = (email) => ({
  type: GET_USER_EMAIL,
  userEmail: email,
});

// https://medium.com/swlh/few-ways-to-update-a-state-array-in-redux-reducer-f2621ae8061
export const PREPEND_EXPENSES = 'PREPEND_EXPENSES';
export const prependExpenses = (data) => ({
  type: PREPEND_EXPENSES,
  expense: data,
});

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
// https://learn.co/lessons/redux-delete-codealong
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const IS_EDITING = 'IS_EDITING';
export const isEditing = (currEdit) => ({
  type: IS_EDITING,
  isEditing,
  currEdit,
});
