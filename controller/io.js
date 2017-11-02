const config = require('../config');
let gpio;

function init() {
  try{
    gpio = require('rpi-gpio');
    
    closePins();
    gpio.setup(config.temperatureGpio, gpio.DIR_OUT, () => {
      console.log('Configured GPIO ' + config.temperatureGpio)
    });
  } catch (ex) {
    console.warn('Cannot init GPIO...');
    gpio = {
      write: writeMock
    };
  }
}

function closePins() {
  try {
    gpio.destroy(function() {
        console.log('All pins unexported');
    });
  } catch(ex) {
    console.error(ex);
  }
}

function writeTemp (value) {
  console.log('> gpio.write');
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