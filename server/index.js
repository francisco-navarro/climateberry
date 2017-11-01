module.exports = function (app) {

  const router = require('./router');
  app.use('/api', router);
};
