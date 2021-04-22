// Actions
export const GET_LOGIN = 'GET_LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const AGROUP_CURRENCIES = 'AGROUP_CURRENCIES';
export const SUM_EXPENSES = 'SUM_EXPENSES';

export default (email) => ({ type: 'LOGIN_ACTION', payload: { email } });

export const addExpense = (expenses) => ({ type: ADD_EXPENSE, payload: [expenses] });

export const agroupCurrencies = (currencies) => ({
  type: AGROUP_CURRENCIES, payload: currencies });

export const sumExpenses = (value) => ({ type: SUM_EXPENSES, payload: value });
