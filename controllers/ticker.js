const Ticker = require('../models/ticker')
const moment = require('moment');

const tickerController = () => { };

tickerController.get = () => {
    return new Promise((resolve, reject) => {
        Ticker.findAllTickers()
        .then((data) => {
            let tickerObj = data[0];
            tickerObj.formattedDate = moment(tickerObj.updatedAt).format('MMMM Do YYYY'); 
            var num = tickerObj.latestPrice;
            var with2Decimals = num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
            tickerObj.latestPrice = with2Decimals;
            resolve(tickerObj);
        })
    })
};

module.exports = tickerController;