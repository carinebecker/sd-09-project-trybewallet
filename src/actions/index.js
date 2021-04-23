import fetchApi from '../services/api';

const GET_CURRENCY = 'GET_CURRENCY';

const ADD_EXPENSE = 'ADD_EXPENSE';

const DELETE_EXPENSE = 'DELETE_EXPENSE';

const EDIT_EXPENSE = 'EDIT_EXPENSE';

const UPDATE_EXPANSE = 'UPDATE_EXPENSE';

// Coloque aqui suas actions
const updateUserEmail = (store) => ({ type: 'EMAIL_REGISTERED', email: store });

export function addExpense(expense) {
  return { type: ADD_EXPENSE, payload: expense };
}

export function deleteExpense(expense) {
  return { type: DELETE_EXPENSE, payload: expense };
}

export function editExpense(payload) {
  return { type: EDIT_EXPENSE, payload };
}

export function updateExpense(id, expense) {
  return { type: UPDATE_EXPANSE, expense: { id, ...expense } };
}

function getCurrency(json) {
  return { type: GET_CURRENCY, payload: json };
}

export function fetchCurrency() {
  return async (dispatch) => dispatch(getCurrency(await fetchApi()));
}

export default updateUserEmail;
