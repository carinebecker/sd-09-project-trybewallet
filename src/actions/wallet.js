import { GET_CURRENCIES, ADD_EXPENSES } from './action.wallet';
import DELETE_EXPENSES from './action.delete';
import economyAPI from '../services/index';
import EDIT_EXPENSE from './action.edit';
import { DO_NOT_REFRESH } from './doNotRefresh';

const updateCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

const updateExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  expenses,
});

const fetchEconomyApi = () => async (dispatch) => {
  const currencies = await economyAPI();
  return dispatch(updateCurrencies(currencies));
};

const deleteExpenses = (expenses) => ({
  type: DELETE_EXPENSES,
  expenses,
});

const editExpense = (expense) => ({
  type: EDIT_EXPENSE,
  expense,
});

const doNotRefresh = () => ({
  type: DO_NOT_REFRESH,
});

export { fetchEconomyApi, updateExpenses, deleteExpenses, editExpense, doNotRefresh };
