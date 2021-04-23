import getCurrencyOptions from '../services/getCurrencyOptions';

export const USER = 'USER';
export const WALLET = 'WALLET';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES_SUCCESS';
export const REQUEST_CURRENCIES_FAILURE = 'REQUEST_CURRENCIES_FAILURE';
export const CHANGE_EXPENSE = 'CHANGE_EXPENSE';

export const loginUser = (email) => ({
  type: USER,
  email,
});

export const walletCreate = (expenses) => ({
  type: WALLET,
  expenses,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

const receiveCurrenciesSuccess = (result) => ({
  type: REQUEST_CURRENCIES_SUCCESS,
  currencies: result,
});

const receiveCurrenciesFailure = (error) => ({
  type: REQUEST_CURRENCIES_FAILURE,
  error,
});

export function fetchCurrencies() {
  return (dispath) => {
    dispath(requestCurrencies());
    return getCurrencyOptions()
      .then(
        (result) => dispath(receiveCurrenciesSuccess(result)),
        (error) => dispath(receiveCurrenciesFailure(error.message)),
      );
  };
}

export const changeExpense = (expenses) => ({
  type: CHANGE_EXPENSE,
  expenses,
});
