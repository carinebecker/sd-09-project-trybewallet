export const LOGIN = 'LOGIN';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SAVE_EDITED_EXPENSE = 'SAVE_EDITED_EXPENSE';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export function saveEmail(email) {
  return {
    type: LOGIN,
    email,
  };
}

export function saveExpense(expense) {
  return {
    type: SAVE_EXPENSE,
    expense,
  };
}

export function deleteExpense(expense) {
  return {
    type: DELETE_EXPENSE,
    expense,
  };
}

export function editExpense(expense, expenseInEdition) {
  return {
    type: EDIT_EXPENSE,
    expense,
    expenseInEdition,
  };
}

export function saveEditedExpense(expense) {
  return {
    type: SAVE_EDITED_EXPENSE,
    expense,
  };
}

export function getCurrencies(currencies) {
  return {
    type: GET_CURRENCIES,
    currencies,
  };
}
