export const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';

export function currencyList() {
  const currencyListArray = fetch(ENDPOINT)
    .then((r) => r.json())
    .then((currencies) => Object.keys(currencies)
      .filter((currency) => currency !== 'USDT'));
  return currencyListArray;
}
