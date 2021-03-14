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
const ourStory = require('./routes/our-story');
const stockInfo = require('./routes/stock-info');
const news = require('./routes/news');
const secFilings = require('./routes/secfilings');
const sitemap = require('./routes/sitemap');

app.use(bodyParser.json());
require('./config/database');

app.set('view engine', 'ejs');

app.use('/', home);
app.use('/investors', investors);
app.use('/management', team);
app.use('/contact', contact);
app.use('/blank', blank);
app.use('/corpgov', corpgov);
app.use('/our-story', ourStory);
app.use('/stock-info', stockInfo);
app.use('/news', news);
app.use('/secfilings', secFilings);

app.use('/sitemap.xml', sitemap);
app.use('/sitemap', sitemap);

const contactController = require('./controllers/contact');
app.post('/contact', contactController.sendEmail);

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});