async function requestAPI() {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  try {
    const response = await fetch(endpoint);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export default requestAPI;
