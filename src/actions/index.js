export const EMAIL_SAVE = 'EMAIL_SAVE';
export const EXPENSE_SAVE = 'EXPENSE_SAVE';

export function emailSave(email) {
  return { type: EMAIL_SAVE, email };
}

export function expenseSave(expenseDetails) {
  return { type: EXPENSE_SAVE, expenseDetails };
}
