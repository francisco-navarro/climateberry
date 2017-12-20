const mongoose = require('mongoose');
const config = require('../config');

let db;

function init() {
  mongoose.Promise = Promise;
  require('./models/state');
  db = {
    state: mongoose.model('State'),
  };

  mongoose.connect(`mongodb://${config.connection_string}`, {
    useMongoClient: true,
  });
}

function write() {
  console.log(db);
}

module.exports = {
  init,
  write,
};
