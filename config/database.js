const mongoose = require('mongoose');
// console.log(process.env.NODE_ENV);


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const uri = `mongodb+srv://${process.env.dbUser}:${process.env.dbPassword}@cluster0-oj6p1.mongodb.net/bakhu?retryWrites=true&w=majority`;

mongoose.connect(uri, options)
    .then((res) => {
        console.log("Connected to database.")
    }, err => {
        console.log(err);
        throw err;
    })
    
mongoose.Promise = global.Promise;

