const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
    res.header('Content-Type', 'application/xml');
    res.sendFile('/views/pages/sitemap.xml',  { root: "." });
});

module.exports = app;