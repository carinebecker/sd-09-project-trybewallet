const fetchAPI = async () => {
  const data = await fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json());

  delete data.USDT;
  return data;
};

export default fetchAPI;
