// Actions
export const GET_LOGIN = 'GET_LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const AGROUP_CURRENCIES = 'AGROUP_CURRENCIES';
export const SUM_EXPENSES = 'SUM_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSES';
export const SUBTRACT_EXPENSES = 'SUBTRACT_EXPENSES';
export const SEND_TO_EDIT = 'SEND_TO_EDIT';
export const FINISH_EDIT = 'FINISH_EDIT';

export default (email) => ({ type: 'GET_LOGIN', payload: { email } });

export const addExpense = (expenses) => ({ type: ADD_EXPENSE, payload: [expenses] });

export const agroupCurrencies = (currencies) => ({
  type: AGROUP_CURRENCIES, payload: currencies });

export const sumExpenses = (value) => ({ type: SUM_EXPENSES, payload: value });

export const deleteExpense = (id) => ({ type: DELETE_EXPENSE, payload: id });

export const subtractExpenses = (value) => ({ type: SUBTRACT_EXPENSES, payload: value });

export const sendToEdit = (expense) => ({
  type: SEND_TO_EDIT,
  expense,
});

export const finishEdit = (expense) => ({
  type: FINISH_EDIT,
  expense,
});
