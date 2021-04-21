const CURRENCIES_API = 'https://economia.awesomeapi.com.br';
const getCurrencyOptions = async () => {
  try {
    const response = await fetch(`${CURRENCIES_API}/json/all`);
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error('Failed to fetch API');
  }
};

export default getCurrencyOptions;
