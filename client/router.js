function init() {
  const router = require('express').Router();
  // rutas para el control con homebridge

  var status = true;
  var temperature = 22;
  var targetTemperature = 22;
  var heatingState = false;

  router.get('/status', (req, res) => {
    res.json({
      currentState: status,
      currentTemp: temperature,
      targetTemperature: targetTemperature,
      heatingState: heatingState,
      currentHumidity:  60.5
    }).status(200);
  });

  router.get('/temp', (req, res) => {
    res.json({temperature: temperature}).status(200);
  });

  router.post('/order', (req, res) => {
    status = req.body.targetState || true;
    targetTemperature = req.body.targetTemperature || 20;
    res.json({currentState: status}).status(200);
  });

  return router;
}

module.exports = init();