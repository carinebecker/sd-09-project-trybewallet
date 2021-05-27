const AND_POINT_API = 'https://economia.awesomeapi.com.br/json/all';
const getCurrenciesValues = () => (
  fetch(AND_POINT_API)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default getCurrenciesValues;
