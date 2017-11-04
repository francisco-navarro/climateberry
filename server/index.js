module.exports = function (app) {
  const router = require('./router');
  const devices = require('./controller/devices.controller');

  console.log('starting climateberry server');
  app.use('/api', router);
  devices.init();
};
