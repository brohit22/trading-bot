const INITIAL_PRICE = 150;
const VOLATILITY = 0.02; // 2% volatility

function getRandomPrice(basePrice) {
  const change = basePrice * VOLATILITY * (Math.random() - 0.5);
  return basePrice + change;
}

let currentPrice = INITIAL_PRICE;

async function getStockPrice(symbol) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  currentPrice = getRandomPrice(currentPrice);
  return parseFloat(currentPrice.toFixed(2));
}

module.exports = { getStockPrice };
