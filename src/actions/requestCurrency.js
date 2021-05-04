import { GET_CURRENCY, REQUEST_CURRENCY, FAIL_REQUEST } from './index';

function getCurrency(json) {
  return {
    type: GET_CURRENCY,
    payload: Object.keys(json),
  };
}

function requestCurrency() {
  return { type: REQUEST_CURRENCY };
}

function failRequest(error) {
  return { type: FAIL_REQUEST, payload: error };
}

export default function fetchCurrenciesAction() {
  return (dispatch) => {
    dispatch(requestCurrency());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json()
        .then(
          (json) => dispatch(getCurrency(json)),
          (error) => dispatch(failRequest(error)),
        ));
  };
}
