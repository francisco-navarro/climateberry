const mongoose = require('mongoose');
const config = require('../config');

let db;

function init() {
  mongoose.Promise = Promise;
  require('./models/state');
  db = {
    State: mongoose.model('State'),
  };

  mongoose.connect(`mongodb://${config.connection_string}`, {
    useMongoClient: true,
  });
}

function write(temperature) {
  let state = new db.State({
    temperature,
    timestamp: new Date(),
  });
  return state.save();
}

module.exports = {
  init,
  write,
};