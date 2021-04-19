const getCurrencyOptions = async () => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error('Failed to fetch API');
  }
};

export default getCurrencyOptions;
