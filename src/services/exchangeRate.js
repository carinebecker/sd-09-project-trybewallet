const getExchangeRatesAPI = async () => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates = await response.json();
    delete exchangeRates.USDT;
    return exchangeRates;
  } catch (error) {
    console.log(error);
  }
};

export default getExchangeRatesAPI;
