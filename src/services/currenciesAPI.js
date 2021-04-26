const endpoint = 'https://economia.awesomeapi.com.br';

const getCurrenciesAPI = async () => {
  const requestCurrencies = await fetch(`${endpoint}/json/all`);
  const currenciesJson = await requestCurrencies.json();
  return currenciesJson;
};

export default getCurrenciesAPI;
