const gpio = require('rpi-gpio');
const config = requier('../config');

function init() {
  gpio.setup(config.temperatureGpio, gpio.DIR_OUT, () => 
    console.log('Configured GPIO ' + config.temperatureGpio)
  );
}

function writeTemp (value) {
  gpio.write(7, value, function(err) {
    if (err) throw err;
    console.log('Written to pin ' + config.temperatureGpio);
  });
}

module.exports = {
  init,
  writeTemp
};