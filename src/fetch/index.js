const fetchAPI = () => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => response.json()
    .then((data) => {
      delete data.USDT;
      console.log(data);
      return data;
    })
    .catch((error) => (
      error
    )));

export default fetchAPI;
