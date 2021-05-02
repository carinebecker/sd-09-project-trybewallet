export const SET_EMAIL = 'SET_EMAIL';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const SET_EXPENSE = 'SET_EXPENSE';
export const SET_TOTAL_EXPENSE = 'SET_TOTAL_EXPENSE';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
export const SET_EDIT_MODE = 'SET_EDIT_MODE';

export const setEmail = (email) => ({
  type: SET_EMAIL,
  email,
});

export const setCurrencies = (currencies) => ({
  type: SET_CURRENCIES,
  currencies,
});

export const setExpense = (expense) => ({
  type: SET_EXPENSE,
  expense,
});

export const setTotalExpense = (totalExpense) => ({
  type: SET_TOTAL_EXPENSE,
  totalExpense,
});

export const updateExpenses = (expenses) => ({
  type: UPDATE_EXPENSES,
  expenses,
});

export const setEditExpense = (edit) => ({
  type: SET_EDIT_MODE,
  edit,
});

export const fetchCurrencies = () => (
  async (dispatch) => {
    try {
      const fetchResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
      const currencies = await fetchResponse.json();
      delete currencies.USDT;
      return dispatch(setCurrencies(currencies));
    } catch (error) {
      return console.log(error);
    }
  }
);

// Coloque aqui suas actions
// Recebe um valor e retorna um objeto com tipo e valor
// const actionName = () => ({ type: 'CASE_NAME', value });

// export default actionName;

// const action = {
//   type: 'LOGIN',
// };
// // Define an action creator here:
// function actionCreator() {
//   return action;
// }
