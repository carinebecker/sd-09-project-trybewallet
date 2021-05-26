import { SAVE_EXPENSE_INFO, ERASE_EXPENSE, UPDATE_INFO } from './actionTypes';

export const saveExpensesInfo = (expenseInfo) => (
  { type: SAVE_EXPENSE_INFO, expenseInfo });

export const eraseExpensesInfo = (expenseId) => (
  { type: ERASE_EXPENSE, expenseId });

export const updateExpenseInfo = (updatedExpenseInfo) => (
  { type: UPDATE_INFO, updatedExpenseInfo });
