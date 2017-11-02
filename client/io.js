const config = require('../config');
let gpio;

function init() {
  gpio = require('rpi-gpio');

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