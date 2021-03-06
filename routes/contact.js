const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
        res.render('./pages/contact');
});

module.exports = app;