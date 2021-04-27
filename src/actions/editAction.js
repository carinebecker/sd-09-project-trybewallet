import { EDIT, ENABLE_EDIT } from './actionsTypes';

export const enableEditAction = (expenseForEditing) => ({
  type: ENABLE_EDIT,
  expenseForEditing,
});

export const editAction = (expensesEdited) => ({
  type: EDIT,
  expensesEdited,
});
