const economyAPI = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currency = await response.json();

  delete currency.USDT;

  return currency;
};

export default economyAPI;
