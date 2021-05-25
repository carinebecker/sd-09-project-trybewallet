export const saveUserEmail = (email) => ({ type: 'SET_EMAIL', email });

export const saveExpenses = (expense) => ({ type: 'SET_EXPENSE', expense });

export const deleteExpense = (index) => ({ type: 'DEL_EXPENSE', index });
