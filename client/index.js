module.exports = function (app) {  
    const router = require('./router');  
    const io = require('./controller/io.controller');
  
    app.use('/api', router);
    io.init();
};
