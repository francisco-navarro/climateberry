function init() {
  const router = require('express').Router();
  // rutas para el control con homebridge

  var status = true;

  router.get('/status', (req, res) => {
    res.json({currentState: status}).status(200);
  });

  router.post('/order', (req, res) => {
    status = req.body.targetState;
    res.json({currentState: status}).status(200);
  });

  return router;
}

module.exports = init();