const getCurrencyApi = () => {
  const endPoint = 'https://economia.awesomeapi.com.br/json/all';
  return fetch(endPoint).then((response) => (
    response.json()
      .then((json) => (response.ok ? Promise.resolve(json) : Promise.resolve(json)))
  ));
};
export default getCurrencyApi;
