const express = require('express');
const app = express();
const path = require('path');
const api = require('./server/routes/api');
const connectToDB = require('./server/config/db')

require('dotenv').config();
const { NODE_ENV, PORT } = process.env;

connectToDB()

if (NODE_ENV === 'development') {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  // app.use(express.static(path.join(__dirname, 'node_modules')));
}

app.use('/api', api);

if (NODE_ENV === 'production') {
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(PORT, function () {
  console.log(`Running server on port ${PORT}`);
});
