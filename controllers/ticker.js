const Ticker = require('../models/ticker')
const moment = require('moment');

const tickerController = () => { };

tickerController.get = () => {
    return new Promise((resolve, reject) => {
        Ticker.findAllTickers()
        .then((data) => {
            let tickerObj = data[0];
            tickerObj.latestPrice = parseInt(tickerObj.latestPrice).toFixed(2);
            tickerObj.formattedDate = moment(tickerObj.updatedAt).format('MMMM Do YYYY');
            console.log(tickerObj.formattedDate)
            resolve(tickerObj);
        })
    })
};

module.exports = tickerController;