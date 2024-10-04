const TradingStrategy = require('../models/tradingStrategy');
const ProfitLossTracker = require('../models/profitLossTracker');
const { getStockPrice } = require('./mockApi');

class TradingBot {
  constructor() {
    this.stockSymbol = process.env.STOCK_SYMBOL || 'AAPL';
    this.initialBalance = parseFloat(process.env.INITIAL_BALANCE) || 10000;
    this.interval = parseInt(process.env.INTERVAL) || 5000; // 5 seconds
    this.strategy = new TradingStrategy();
    this.tracker = new ProfitLossTracker(this.initialBalance);
    this.isRunning = false;
    this.intervalId = null;
  }

  async runTradingCycle() {
    try {
      const price = await getStockPrice(this.stockSymbol);
      const action = this.strategy.decideTrade(price);

      if (action === 'BUY') {
        const quantity = Math.floor(this.tracker.getBalance() / price);
        if (quantity > 0) {
          this.tracker.buy(price, quantity);
          console.log(`Bought ${quantity} shares at $${price}`);
        }
      } else if (action === 'SELL') {
        const quantity = this.tracker.getPosition();
        if (quantity > 0) {
          this.tracker.sell(price, quantity);
          console.log(`Sold ${quantity} shares at $${price}`);
        }
      }

      console.log(`Current balance: $${this.tracker.getBalance().toFixed(2)}`);
      console.log(`Current position: ${this.tracker.getPosition()} shares`);
      console.log(`Current P/L: $${this.tracker.getProfitLoss().toFixed(2)}`);
      console.log('---');
    } catch (error) {
      console.error('Error in trading bot:', error);
    }
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.intervalId = setInterval(
        () => this.runTradingCycle(),
        this.interval
      );
      console.log(
        `Trading bot started. Monitoring ${this.stockSymbol} every ${
          this.interval / 1000
        } seconds.`
      );
    }
  }

  stop() {
    if (this.isRunning) {
      clearInterval(this.intervalId);
      this.isRunning = false;
      console.log('Trading bot stopped.');
    }
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      stockSymbol: this.stockSymbol,
      currentBalance: this.tracker.getBalance(),
      currentPosition: this.tracker.getPosition(),
      currentProfitLoss: this.tracker.getProfitLoss(),
    };
  }

  getSummary() {
    return this.tracker.getSummaryReport();
  }
}

module.exports = TradingBot;
