module.exports = function init(app) {
  const router = require('./router');
  const express = require('express');
  // const devices = require('./controller/devices.controller');
  // devices.init();

  app.use('/lib', express.static('node_modules'));
  app.use(express.static('server'));

  console.log('starting climateberry server');
  app.use('/api', router);
};
