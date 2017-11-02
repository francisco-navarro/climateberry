const config = require('../config');
let gpio;

function init() {
  try{
    gpio = require('rpi-gpio');
    
    gpio.setup(config.temperatureGpio, gpio.DIR_OUT, () => {
      writeTemp(false);
      console.log('Configured GPIO ' + config.temperatureGpio)
    });
  } catch (ex) {
    console.warn('Cannot init GPIO...');
    gpio = {
      write: writeMock
    };
  }
}

function writeTemp (value) {
  gpio.write(config.temperatureGpio, value, function(err) {
    if (err) throw err;
    console.log('Written ' + value + ' to pin ' + config.temperatureGpio);
  });
}

function writeMock(port, value, calb) {
  console.info('GPIO OUTPUT ' + port + ' ' + value);
  calb();
}

module.exports = {
  init,
  writeTemp
};