function init (app) {
  let router = require('express').Router();

  router.get('/temperature', (req, res) => {
    res.json({actual: 21, desired: 32});
  });

  app.use('/api', router);
}

module.exports = init;