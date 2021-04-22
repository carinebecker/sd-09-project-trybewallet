import fetchMoedas from '../services/requireApi';

export const EMAIL_USER = 'EMAIL_USER';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const SET_EXPENSE = 'SET_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const ERROR_EXPENSE = 'ERROR_EXPENSE';
export const SUM_PRICE_VALUE = 'SUM_PRICE_VALUE';

const dataEmailUser = (email) => ({
  type: EMAIL_USER,
  email,
});

const addExpenseAction = (dispesaAtual, moedas) => ({
  type: ADD_EXPENSE,
  dispesaAtual,
  moedas,
});

const setExpenseAction = (expenses) => ({
  type: SET_EXPENSE,
  expenses,
});

const editExpenseAction = (expenses) => ({
  type: EDIT_EXPENSE,
  expenses,
});

const addExpenseActionError = (error) => ({
  type: ERROR_EXPENSE,
  error,
});

const addExpenseThunk = (dispesaAtual) => (
  (dispatch) => {
    fetchMoedas()
      .then((response) => dispatch(addExpenseAction(dispesaAtual, response)))
      .catch((error) => dispatch(addExpenseActionError(error)));
  }
);

export { addExpenseThunk, dataEmailUser, setExpenseAction, editExpenseAction };
