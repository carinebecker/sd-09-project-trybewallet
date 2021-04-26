export const setUserEmail = (user) => ({ type: 'SET_EMAIL', user });
export const addExpense = (expenses) => ({ type: 'ADD_EXPENSE', payload: [expenses] });
export const sumExpenses = (value) => ({ type: 'SUM_EXPENSES', payload: value });
export const deleteExpense = (id) => ({ type: 'DELETE_EXPENSE', payload: id });
export const editExpense = (id) => ({ type: 'EDIT_EXPENSE', payload: id });
/* export const subExpense = (value) => ({ type: 'SUB_EXPENSE', payload: value }); */
