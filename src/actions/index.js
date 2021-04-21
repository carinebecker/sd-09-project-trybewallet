// Coloque aqui suas actions
// chaves USER e WALLET no estado global
import getCurrencyOptions from '../services/getCurrencyOptions';

export const USER = 'USER';
export const WALLET = 'WALLET';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES_SUCCESS';
export const REQUEST_CURRENCIES_FAILURE = 'REQUEST_CURRENCIES_FAILURE';

export const loginUser = (email) => ({
  type: USER,
  email,
});

export const walletCreate = (expenses) => ({
  type: WALLET,
  expenses,
});

// action que avisa sobre a atualização
export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

// action que fornece as informações
const receiveCurrenciesSuccess = (result) => ({
  type: REQUEST_CURRENCIES_SUCCESS,
  currencies: result,
});

const receiveCurrenciesFailure = (error) => ({
  type: REQUEST_CURRENCIES_FAILURE,
  error,
});

// action que faz a req das informações / retorna uma função
export function fetchCurrencies() {
  return (dispath) => {
    // despacha a action que no reduce altera a chave isFetching para true
    dispath(requestCurrencies());
    // requisição para api
    //const jsonData = await getCurrencyOptions();
    // apos a requisição despacha a action de success
    //dispath(receiveCurrenciesSuccess(jsonData));
    return getCurrencyOptions()
      .then(
        (result) => dispath(receiveCurrenciesSuccess(result)),
        (error) => dispath(receiveCurrenciesFailure(error.message)),
      );
  };
}
