// import exchangeRatesAPI from '../services/exchangeRate';

export const LOGIN = 'LOGIN';
export const setEmail = (email) => ({ type: LOGIN, email });

// export const REQUEST_EXCHANGE_RATE = 'REQUEST_EXCHANGE_RATE';
// export const RECEIVE_EXCHANGE_RATE = 'RECEIVE_EXCHANGE_RATE';

// const requestExchangeRate = () => ({ type: REQUEST_EXCHANGE_RATE });

// const receiveExchangeRate = (expenses) => ({
//   type: RECEIVE_EXCHANGE_RATE,
//   expenses,
// });

// export const setExchangeRates = () => async (dispatch) => {
//   dispatch(requestExchangeRate());
//   try {
//     const exchangeRates = await exchangeRatesAPI();
//     dispatch(receiveExchangeRate(exchangeRates));
//   } catch (error) {
//     console.log(error);
//   }
// };

export const SAVE_EXPENSES = 'EXPENSES';
export const saveExpenses = (expenses) => ({ type: SAVE_EXPENSES, expenses });

export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const deleteExpense = (expense) => ({ type: DELETE_EXPENSE, expense });

export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const editExpense = (expense) => ({ type: EDIT_EXPENSE, expense });
