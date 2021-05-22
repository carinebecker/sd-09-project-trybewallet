async function getCoins() {
  const coins = await fetch('https://economia.awesomeapi.com.br/json/all');
  const coinsjson = await coins.json();
  return coinsjson;
}

export default getCoins;
