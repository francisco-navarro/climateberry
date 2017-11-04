function init() {
  const router = require('express').Router();
  // rutas para el control con homebridge

  router.get('/status', (req, res) => {
    res.send("true");
  });

  router.post('/order', (req, res) => {
    res.json({});
  });

  return router;
}

module.exports = init();