const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const tickerSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  symbol: { type: String },
  latestPrice: { type: String }
});

tickerSchema.pre('save', function (next) {
  let ticker = this;
  
  this.createdAt = ticker.createdAt ? ticker.createdAt : moment().local();
  this.updatedAt = moment().local();
  
  next();
})

Ticker = mongoose.model('Ticker', tickerSchema);


Ticker.findAllTickers = () => {
	console.log('findAllTickers exec');
	return new Promise((resolve, reject) => {
		console.log(Ticker.db.readyState);
		Ticker.find()
		.exec((err, result) => {
			if(err) {
				console.log('err : ');
				console.log(err);
				return reject(err);
			}
			console.log('result : ');
			console.log(result);
			 return resolve(result);
		})
	})
}

module.exports = Ticker;