class TradingStrategy {
  constructor() {
    this.lastPrice = null;
    this.buyThreshold = -0.02; // 2% drop
    this.sellThreshold = 0.03; // 3% rise
  }

  decideTrade(currentPrice) {
    if (this.lastPrice === null) {
      this.lastPrice = currentPrice;
      return 'HOLD';
    }

    const priceChange = (currentPrice - this.lastPrice) / this.lastPrice;

    let action = 'HOLD';
    if (priceChange <= this.buyThreshold) {
      action = 'BUY';
    } else if (priceChange >= this.sellThreshold) {
      action = 'SELL';
    }

    this.lastPrice = currentPrice;
    return action;
  }
}

module.exports = TradingStrategy;
