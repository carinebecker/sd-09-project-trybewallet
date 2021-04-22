const fetchMoedas = async () => {
  const endPoint = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(endPoint);
  const data = await response.json();

  delete data.USDT;
  return data;
};

export default fetchMoedas;
