const express = require('express');
require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// require('./config/database');

const home = require('./routes/home');

app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use('/', home);

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});