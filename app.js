require('dotenv').config();
const express = require('express');
const tradingRoutes = require('./routes/tradingRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/trading', tradingRoutes);

// Start the trading bot
const TradingBot = require('./services/tradingBot');
const tradingBot = new TradingBot();
tradingBot.start();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
