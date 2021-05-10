const fetchAPI = async () => {
  try {
    const data = await fetch('https://economia.awesomeapi.com.br/json/all');
    const dataJson = await data.json();
    return dataJson;
  } catch (error) {
    console.error(error);
  }
};

export default fetchAPI;
