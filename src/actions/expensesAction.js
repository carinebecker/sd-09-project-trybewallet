import {
  REQUEST_CURRENCY,
  GET_CURRENCY_AND_DISPENSE,
  FAILURE_CURRENCY } from './actionsTypes';

const requestCurrency = () => ({
  type: REQUEST_CURRENCY,
});

const getCurrencyAndDispense = (dispenseData, currencies) => ({
  type: GET_CURRENCY_AND_DISPENSE,
  dispenseData,
  currencies,
});

const failureCurrency = (error) => ({
  type: FAILURE_CURRENCY,
  error,
});

const expensesAction = (expenses) => async (dispatch) => {
  dispatch(requestCurrency());
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currency = await response.json();
    expenses.exchangeRates = currency;
    const currencies = expenses.currencyList;
    // Solução do `delete` encontrada em
    // https://qastack.com.br/programming/208105/how-do-i-remove-a-property-from-a-javascript-object#:~:text=Objetos%20em%20JavaScript%20podem%20ser,objeto%2C%20uma%20de%20cada%20vez.
    delete expenses.currencyList;
    dispatch(getCurrencyAndDispense(expenses, currencies));
  } catch (error) {
    dispatch(failureCurrency(error));
  }
};

export default expensesAction;
