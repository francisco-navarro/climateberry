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

function write(status) {
  let state = new db.State({
    temperature: status.temperature,
    target: status.HeatingState ? status.target : 15,
    heatingState: status.HeatingState,
    timestamp: new Date(),
  });
  return state.save();
}

function list() {
  return db.State.find()
    .sort({ timestamp: -1 });
}

module.exports = {
  init,
  write,
  list,
};
