export const setUserEmail = (user) => ({ type: 'SET_EMAIL', user });
export const setCurr = (currencies) => ({ type: 'SET_CURRENCIES', payload: currencies });
export const setIdCounter = () => ({ type: 'SET_ID_COUNTER' });
export const addExpense = (expenses) => ({ type: 'ADD_EXPENSE', payload: expenses });
export const sumExpenses = (value) => ({ type: 'SUM_EXPENSES', payload: value });
export const deleteExpense = (id) => ({ type: 'DELETE_EXPENSE', payload: id });
export const editExpense = (expense) => ({ type: 'EDIT_EXPENSE', payload: expense });
export const editID = (id) => ({ type: 'EDIT_ID', payload: id });
export const toggleEditMode = () => ({ type: 'EDIT_MODE' });
