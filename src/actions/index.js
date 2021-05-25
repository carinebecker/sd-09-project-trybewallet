export const LOGIN = 'LOGIN';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';

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
