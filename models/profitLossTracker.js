class ProfitLossTracker {
  constructor(initialBalance) {
    this.initialBalance = initialBalance;
    this.balance = initialBalance;
    this.position = 0;
    this.trades = [];
  }

  buy(price, quantity) {
    const cost = price * quantity;
    if (cost > this.balance) {
      throw new Error('Insufficient balance');
    }
    this.balance -= cost;
    this.position += quantity;
    this.trades.push({ type: 'BUY', price, quantity, timestamp: new Date() });
  }

  sell(price, quantity) {
    if (quantity > this.position) {
      throw new Error('Insufficient position');
    }
    const revenue = price * quantity;
    this.balance += revenue;
    this.position -= quantity;
    this.trades.push({ type: 'SELL', price, quantity, timestamp: new Date() });
  }

  getBalance() {
    return this.balance;
  }

  getPosition() {
    return this.position;
  }

  getProfitLoss() {
    return this.balance - this.initialBalance;
  }

  getSummaryReport() {
    return {
      trades: this.trades,
      initialBalance: this.initialBalance,
      finalBalance: this.balance,
      finalPosition: this.position,
      profitLoss: this.getProfitLoss(),
    };
  }
}

module.exports = ProfitLossTracker;
