module.exports = function init() {
  const router = require('express').Router();
  const db = require('../db/index');
  const temperateController = require('./controller/temperature.controller');

  temperateController.init().then(() => {
    console.log('Router started');
  });

  router.get('/status', (req, res) => {
    res.json(temperateController.getStatus()).status(200);
  });

  router.get('/history', (req, res) => {
    db.list().then(resp =>
      res.json(resp).status(200));
  });

  router.post('/order', (req, res) => {
    temperateController.setTarget(
      req.body.heatingState,
      req.body.targetTemperature
    );
    res.json(temperateController.getStatus()).status(200);
  });

  return router;
};
