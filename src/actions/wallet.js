import { GET_CURRENCIES, ADD_EXPENSES } from './action.wallet';
import EDIT_EXPENSES from './action.edit';
import economyAPI from '../services/index';

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

const editExpenses = (expenses) => ({
  type: EDIT_EXPENSES,
  expenses,
});

export { fetchEconomyApi, updateExpenses, editExpenses };
