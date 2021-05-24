import { SAVE_EXPENSE_INFO, ERASE_EXPENSE } from './actionTypes';

export const saveExpensesInfo = (expenseInfo) => (
  { type: SAVE_EXPENSE_INFO, expenseInfo });

export const eraseExpensesInfo = (expenseId) => ({ type: ERASE_EXPENSE, expenseId });
