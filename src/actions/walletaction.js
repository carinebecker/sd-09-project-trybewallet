import fetchCoins from '../services/api';

export const EXPENSES = 'EXPENSES';
export const LOAD_CURRENCIES = 'LOAD_CURRENCIES';

const wallet = ({ value, description, currency, method, tag, exchangeRates }) => ({
  type: EXPENSES,
  payload: {
    value,
    description,
    currency,
    method,
    tag,
    exchangeRates,
  },
});

const sendCoins = (currencies) => ({
  type: LOAD_CURRENCIES,
  payload: {
    currencies,
  },
});

export function requisitionCoins() {
  return (
    async (dispatch) => {
      const currenciesApi = await fetchCoins();
      const currenciesKey = Object.keys(currenciesApi);
      const currenciesFilter = currenciesKey.filter((currency) => currency !== 'USDT');
      dispatch(sendCoins(currenciesFilter));
    }
  );
}

export function createExpense({ value, description, currency, method, tag }) {
  return (
    async (dispatch) => {
      const exchangeRates = await fetchCoins();
      dispatch(wallet({ value, description, currency, method, tag, exchangeRates }));
    }
  );
}
