module.exports = function init() {
  const router = require('express').Router();
  const temperateController = require('./controller/temperature.controller');

  router.get('/status', (req, res) => {
    res.json(temperateController.getStatus()).status(200);
  });

  router.post('/order', (req, res) => {
    temperateController.setTarget(
      req.body.heatingState,
      req.body.targetTemperature,
    );
    res.json(temperateController.getStatus()).status(200);
  });

  return router;
};
