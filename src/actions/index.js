import getCurrencies from '../services/currenciesAPI';

export const SET_EDIT_MODE = 'SET_EDIT_MODE';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_EXPENSE = 'SET_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES_SUCCESS';
export const REQUEST_CURRENCIES_ERROR = 'REQUEST_CURRENCIES_ERROR';

export const setEditMode = ({ editMode, id }) => ({
  type: SET_EDIT_MODE,
  payload: {
    editMode,
    id,
  },
});

export const setEmail = (email) => ({
  type: SET_EMAIL,
  payload: {
    email,
  },
});

export const setExpense = (expense) => ({
  type: SET_EXPENSE,
  payload: {
    expense,
  },
});

export const deleteExpense = (expenses) => ({
  type: DELETE_EXPENSE,
  payload: {
    expenses,
  },
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
  payload: {
    isFetching: true,
  },
});

export const requestCurrenciesSuccess = (currencies) => ({
  type: REQUEST_CURRENCIES_SUCCESS,
  payload: {
    currencies,
    isFetching: false,
  },
});

export const requestCurrenciesError = (error) => ({
  type: REQUEST_CURRENCIES_ERROR,
  payload: {
    error,
    isFetching: false,
  },
});

export const fetchCurrencies = () => (dispatch) => {
  dispatch(requestCurrencies());
  getCurrencies()
    .then((currencies) => {
      delete currencies.USDT;
      dispatch(requestCurrenciesSuccess(currencies));
    })
    .catch((error) => dispatch(requestCurrenciesError(error)));
};
