const endpoint = 'https://economia.awesomeapi.com.br';

export default async function getCurrenciesAPI() {
  const requestCurrencies = await fetch(`${endpoint}/json/all`);
  const result = await requestCurrencies.json();
  return result;
}
