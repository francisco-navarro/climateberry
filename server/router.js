const db = require('../db/index');

function init() {
  const router = require('express').Router();

  router.get('/history', (req, res) => {
    db.list().then(resp =>
      res.json(resp).status(200));
  });

  return router;
}

module.exports = init();
