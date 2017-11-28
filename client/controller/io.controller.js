const config = require('../../config');
const fs = require("fs");

let gpio;

function init() {
  console.warn('Execute with sudo for access to gpio');

  try {
    gpio = require('pi-gpio');
    
    gpio.open(config.temperatureGpio, "output", () => {
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

function closePins() {
  try {
    gpio.close(config.temperatureGpio);
  } catch(ex) {
    console.error(ex);
  }
}

function writeTemp (value) {
  console.log('> gpio.write');
  gpio.write(config.temperatureGpio, value ? 1 : 0, function(err) {
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