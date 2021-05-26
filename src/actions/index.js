export const LOGIN = 'LOGIN';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

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
