export const saveUserEmail = (email) => ({ type: 'SET_EMAIL', email });

export const saveExpenses = (expense) => ({ type: 'SET_EXPENSE', expense });

export const deleteExpense = (index) => ({ type: 'DEL_EXPENSE', payload: index });

export const getExpenseToEdit = (expEdit) => ({ type: 'GET_EDIT_EXPENSE', expEdit });

export const editExpenseList = (ExpEditList) => ({ type: 'EDIT_EXPENSE', ExpEditList });
