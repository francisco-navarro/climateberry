module.exports = function init() {
  const router = require('express').Router();
  const db = require('../db/index');
  const temperateController = require('./controller/temperature.controller');
  const switchController = require('./controller/switch.controller');

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

  router.get('/switch/1/status', (req, res) => {
    switchController.tvState().then(response =>
      res.json(response).status(200));
  });

  router.get('/switch/1/off', (req, res) => {
    switchController.tvOff().then(response =>
      res.json(response).status(200));
  });

  router.get('/switch/1/on', (req, res) => {
    switchController.tvState().then(response =>
      res.json(response).status(200));
  });

  return router;
};
