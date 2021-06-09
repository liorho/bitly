const mongoose = require('mongoose');

const URL = mongoose.model(
  'URL',
  {
    shortURL:  { type: String, required: true },
    longURL:  { type: String, required: true },
    date: Date,
    counter: Number,
  },
  'URLs'
);

module.exports = URL;
