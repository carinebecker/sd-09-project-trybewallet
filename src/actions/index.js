import getCurrencies from '../fetch/getCurrencies';
import
{ ADD_EXPENSE, DELETE, EDITING, EDIT_COMPLETE, EDIT, LOGIN, USER_CURRENCIES }
  from
  '../store/constantes';

export const loginAction = (email) => ({
  type: LOGIN,
  payload: email,
});

export const currenciesAction = (currencies) => ({
  type: USER_CURRENCIES,
  payload: currencies,
});

export const expenseAction = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const expenseExchangeRates = (expense) => async (dispatch) => {
  const currencies = await getCurrencies();
  const expenseRated = { ...expense, exchangeRates: currencies };
  dispatch(expenseAction(expenseRated));
};

export const deleteExpense = (obj) => ({
  type: DELETE,
  payload: obj,
});

export const editExpense = (item) => ({
  type: EDIT,
  payload: item,
});

export const statusToFalse = () => ({
  type: EDITING,
});

export const editComplete = () => ({
  type: EDIT_COMPLETE,
});

export const walletThunk = () => async (dispatch) => {
  const currencies = await getCurrencies();
  const currenciesCodes = Object.values(currencies)
    .filter((currency) => currency.name !== 'Dólar Turismo')
    .map(({ code }) => code);
  dispatch(currenciesAction(currenciesCodes));
};
