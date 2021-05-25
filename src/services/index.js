const currenciesApi = async () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const fetchCurrencies = await fetch(url);
  const response = await fetchCurrencies.json();
  delete response.USDT;
  return response;
};

const fetchApi = {
  currenciesApi,
};

export default fetchApi;
