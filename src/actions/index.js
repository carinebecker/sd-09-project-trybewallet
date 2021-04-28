export const EMAIL_SAVE = 'EMAIL_SAVE';
export const EXPENSE_SAVE = 'EXPENSE_SAVE';
export const EXPENSE_DELETE = 'EXPENSE_DELETE';
export const GET_EXPENSE = 'GET_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export function emailSave(email) {
  return { type: EMAIL_SAVE, email };
}

export function expenseSave(expenseDetails) {
  return { type: EXPENSE_SAVE, expenseDetails };
}

export function expenseDelete(updatedExpense) {
  return { type: EXPENSE_DELETE, updatedExpense };
}

export function getExpense(getExpenseDetails) {
  return { type: GET_EXPENSE, getExpenseDetails };
}

export function editExpense(editedExpenses) {
  return { type: EDIT_EXPENSE, editedExpenses };
}
