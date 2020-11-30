const express = require('express');
require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// require('./config/database');

const home = require('./routes/home');
const investors = require('./routes/investors');
const team = require('./routes/team');
const contact = require('./routes/contact');
const blank = require('./routes/blank');
const corpgov = require('./routes/corpgov');

app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use('/', home);
app.use('/news', investors);
app.use('/team', team);
app.use('/contact', contact);
app.use('/blank', blank);
app.use('/corpgov', corpgov);

const contactController = require('./controllers/contact');
app.post('/contact', contactController.sendEmail);

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});