const express = require('express');
const router = express.Router();
const TradingBot = require('../services/tradingBot');

const tradingBot = new TradingBot();

router.get('/status', (req, res) => {
  const status = tradingBot.getStatus();
  res.json(status);
});

router.get('/summary', (req, res) => {
  const summary = tradingBot.getSummary();
  res.json(summary);
});

router.post('/start', (req, res) => {
  tradingBot.start();
  res.json({ message: 'Trading bot started' });
});

router.post('/stop', (req, res) => {
  tradingBot.stop();
  res.json({ message: 'Trading bot stopped' });
});

module.exports = router;
