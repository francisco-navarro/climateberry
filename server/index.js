module.exports = function (app) {
  const io = require('../controller/io');
  const router = require('./router');
  app.use('/api', router);
  io.init();
};
