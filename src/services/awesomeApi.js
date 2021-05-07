const filterCurrencyTypes = (currencyTypes) => {
  const filtered = [];
  Object.keys(currencyTypes).forEach((currency) => {
    filtered.push(currencyTypes[currency]);
  });
  const result = filtered.filter((value) => (value.codein !== 'BRLT'))
    .filter((value) => (value.code !== 'DOGE'));
  return result;
};

const getCurrencyTypes = async () => {
  const awesomeApiEndPoint = 'https://economia.awesomeapi.com.br/json/all';
  try {
    const response = await fetch(awesomeApiEndPoint);
    const searchResult = await response.json();
    return filterCurrencyTypes(searchResult);
  } catch (error) {
    console.log(error);
  }
};

const getCurrencies = async () => {
  const awesomeApiEndPoint = 'https://economia.awesomeapi.com.br/json/all';
  try {
    const response = await fetch(awesomeApiEndPoint);
    const searchResult = await response.json();
    return searchResult;
  } catch (error) {
    console.log(error);
  }
};

export default { getCurrencyTypes, getCurrencies };
