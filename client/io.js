const gpio = require('rpi-gpio');
const config = require('../config');

function init() {
  gpio.setup(config.temperatureGpio, gpio.DIR_OUT, () => {
    writeTemp(false);
    console.log('Configured GPIO ' + config.temperatureGpio)
  });
}

function writeTemp (value) {
  gpio.write(config.temperatureGpio, value, function(err) {
    if (err) throw err;
    console.log('Written ' + value + ' to pin ' + config.temperatureGpio);
  });
}

module.exports = {
  init,
  writeTemp
};