import getApi from '../services/requestApi';

export const CURRENCIES_VALUES = 'CURRENCIES_VALUES';
export const CURRENCIES_VALUES_SUCCESS = 'CURRENCIES_VALUES_SUCCESS';
export const CURRENCIES_VALUES_ERROR = 'CURRENCIES_VALUES_ERROR';

const currenciesValues = () => ({
  type: CURRENCIES_VALUES,
  payload: { isFetching: true },
});

const currenciesValuesSuccess = (currencies) => ({
  type: CURRENCIES_VALUES_SUCCESS,
  payload: {
    currencies, isFetching: true,
  },
});

const currenciesValuesError = (error) => ({
  type: CURRENCIES_VALUES_ERROR,
  payload: {
    error, isFetching: false,
  },
});

export const fetchCurrenciesValues = () => async (dispatch) => {
  dispatch(currenciesValues());
  try {
    const getCurrenciesValues = await getApi();
    dispatch(currenciesValuesSuccess(Object.keys(getCurrenciesValues)));
  } catch (error) {
    dispatch(currenciesValuesError(error));
  }
};
