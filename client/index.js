module.exports = function (app) {  
    const router = require('./router');  
    const io = require('./controller/io.controller');
    const mqtt = require('./controller/mqtt.controller');
  
    app.use('/api', router);
    io.init();
};
