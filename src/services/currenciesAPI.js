const CURRENCIES_API_URL = 'https://economia.awesomeapi.com.br/json/all';

const getCurrencies = () => (
  fetch(CURRENCIES_API_URL)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default getCurrencies;
