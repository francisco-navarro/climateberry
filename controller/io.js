const config = require('../config');
let gpio;

function init() {
  console.warn('Execute with sudo for access to gpio');

  try{
    gpio = require('pi-gpio');
    
    gpio.open(config.temperatureGpio - 2, "output", () => {
      writeTemp(false);
      console.log('Configured GPIO ' + config.temperatureGpio - 2)
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
    // gpio.destroy(function() {
    //     console.log('All pins unexported');
    // });
    gpio.close(config.temperatureGpio - 2);
  } catch(ex) {
    console.error(ex);
  }
}

function writeTemp (value) {
  console.log('> gpio.write');
  gpio.write(config.temperatureGpio - 2, value ? 1 : 0, function(err) {
    if (err) throw err;
    console.log('Written ' + value + ' to pin ' + config.temperatureGpio - 2);
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