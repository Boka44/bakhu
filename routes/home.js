const express = require('express');
const app = express();

const tickerController = require('../controllers/ticker');

app.get('/', (req, res, next) => {
    tickerController.get()
    .then((tickerData) => {
        res.render('./pages/index', {
            ticker: tickerData
        });
    })
    
});

module.exports = app;