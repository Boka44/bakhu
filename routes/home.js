const express = require('express');
const app = express();

// const tickerController = require('../controllers/ticker');

app.get('/', (req, res, next) => {
    res.render('./pages/index');    
});

module.exports = app;