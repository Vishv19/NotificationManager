var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.API_VERSION = 'v1';
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/notificationmanager');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

require('./app/routes/notification')(app);
require('./app/routes/user')(app);

app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    next();
});

module.exports = app;