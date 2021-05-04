// Actions
export const GET_LOGIN = 'GET_LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const AGROUP_CURRENCIES = 'AGROUP_CURRENCIES';
export const SUM_EXPENSES = 'SUM_EXPENSES';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';

export default (email) => ({ type: 'GET_LOGIN', payload: { email } });

export const addExpense = (expenses) => ({ type: ADD_EXPENSE, expenses });

export const agroupCurrencies = (currencies) => ({ type: AGROUP_CURRENCIES, currencies });

export const sumExpenses = (value) => ({ type: SUM_EXPENSES, value });

export const updateExpenses = (expenses) => ({
  type: UPDATE_EXPENSES,
  expenses,
});
