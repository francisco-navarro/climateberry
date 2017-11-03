module.exports = function (app) {
  const io = require('../controller/io');
  const router = require('./router');

  console.log('starting climateberry server');
  app.use('/api', router);
  io.init();
};
