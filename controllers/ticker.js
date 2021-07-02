// const Ticker = require('../models/ticker')
const moment = require('moment');
const request = require('request');

const tickerController = () => { };

tickerController.get = () => {

    return new Promise((resolve, reject) => {

  
        request('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=BKUH&apikey=' + process.env.ALPHA_API_KEY, (err, response, body) => {
              if (err) {
                console.error(err);
                
              } else {
                try {
                  let response = JSON.parse(body),
                  data = response["Global Quote"];
                  let dataObj = {
                        symbol: data["01. symbol"],
                        latestPrice: data['05. price']
                    }
                    console.log(dataObj);

                    
                    var num = dataObj.latestPrice;
                    var with2Decimals = num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
                    dataObj.latestPrice = with2Decimals;
      
                    resolve(dataObj)
            
                  
                } catch (e) {
                  console.error(e);
                  
                  reject();
                }
              }
            });
          })


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