// Coloque aqui suas actions
import fetchAPI from '../fetch';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const RECEIVE_PRICE = 'RECEIVE_PRICE';
export const RECEIVE_PRICE_FAIL = 'RECEIVE_PRICE_FAIL';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

const receivePrice = (data) => ({
  type: RECEIVE_PRICE,
  data,
});

const receivePriceFail = (error) => ({
  type: RECEIVE_PRICE_FAIL,
  error,
});

export function fetchPrice() {
  return (dispatch) => (
    fetchAPI()
      .then((data) => dispatch(receivePrice(data)))
      .catch((error) => dispatch(receivePriceFail(error)))
  );
}

export const saveExpense = (data) => ({
  type: SAVE_EXPENSE,
  data,
});
