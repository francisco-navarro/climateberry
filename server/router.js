function init() {
  
  const router = require('express').Router();
  const temperatureController = require('./controller/temperature.controller');
  const loginController = require('./controller/login.controller');

  router.get('/temperature', (req, res) => {
    res.json(temperatureController.get(req));
  });

  router.put('/temperature', (req, res) => {
    res.json(temperatureController.put(req));
  });


  return router;
}
  
module.exports = init();