const API = 'https://economia.awesomeapi.com.br/json/all';

const getApi = async () => {
  const response = await fetch(API);
  const result = response.json();
  return result;
};

export default getApi;
