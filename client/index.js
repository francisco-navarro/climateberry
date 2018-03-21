const router = require('./router');
const io = require('./controller/io.controller');
const db = require('../db/index');
// const mqtt = require('./controller/mqtt.controller');

module.exports = function init(app) {
  app.use('/api', router());
  io.init();
  //db.init();
};
