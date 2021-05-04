import { GET_EXCHANGE_RATES, FAIL_REQUEST } from './index';

function getExchangeRates(json) {
  return {
    type: GET_EXCHANGE_RATES,
    payload: json,
  };
}

function failedRequest(error) {
  return { type: FAIL_REQUEST, payload: error };
}

export default function fetchExchangeRatesAction() {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json()
      .then(
        (json) => dispatch(getExchangeRates(json)),
        (error) => dispatch(failedRequest(error)),
      ));
}
