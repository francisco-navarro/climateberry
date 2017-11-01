const gpio = require('rpi-gpio');
const config = require('../config');

function init() {
  // 
  gpio.setup(7, gpio.DIR_OUT, write);
  
  function write() {
      gpio.write(7, true, function(err) {
          if (err) throw err;
          console.log('Written to pin');
      });
  }
}

function writeTemp (value) {
  gpio.write(config.temperatureGpio, value, function(err) {
    if (err) throw err;
    console.log('Written to pin ' + config.temperatureGpio);
  });
}

module.exports = {
  init,
  writeTemp
};