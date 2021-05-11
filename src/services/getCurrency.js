const requestCurrencies = () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  fetch(url)
    .then((response) => response.json())
    .then((json) => json);
};

export default requestCurrencies;
