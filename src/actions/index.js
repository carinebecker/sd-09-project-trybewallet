// Actions
export const GET_LOGIN = 'GET_LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const AGROUP_CURRENCIES = 'AGROUP_CURRENCIES';
export const SUM_EXPENSES = 'SUM_EXPENSES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const SUBTRACT_EXPENSES = 'SUBTRACT_EXPENSES';

export default (email) => ({ type: 'GET_LOGIN', payload: { email } });

export const addExpense = (expenses) => ({ type: ADD_EXPENSE, payload: [expenses] });

export const agroupCurrencies = (currencies) => ({
  type: AGROUP_CURRENCIES, payload: currencies });

export const sumExpenses = (value) => ({ type: SUM_EXPENSES, payload: value });

export const deleteExpense = (expanses) => ({
  type: DELETE_EXPENSES, payload: [expanses] });

export const subtractExpenses = (value) => ({ type: SUBTRACT_EXPENSES, payload: value });
