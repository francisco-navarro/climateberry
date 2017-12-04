const config = require('../../config').gpio;
const fs = require('fs');

function setDirection(pin, direction) {
  return new Promise((resolve, reject) => {
    console.log('set direction %s on pin %d', direction.toUpperCase(), pin);
    fs.writeFile(`${config.path}/gpio${pin}/direction`, direction, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function exportPin(pin, direction) {
  return new Promise((resolve, reject) => {
    console.log('export pin %d', pin);
    fs.writeFile(`${config.path}/export`, pin, (err) => {
      if (err) {
        reject(err);
      } else {
        return setDirection(pin, direction).then(resolve);
      }
    });
  });
}

function write(pin, value) {
  console.log(`\t> gpio.write ${pin} ${value}`);
  fs.writeFile(`${config.path}/gpio${pin}/value`, value);
}

function init() {
  console.warn('Execute with sudo for access to gpio');
  exportPin(config.gpio.relayPin, 'out');
  exportPin(config.gpio.temperaturePin, 'in');
}

function writeTemp(value) {
  write(config.temperatureGpio, value ? 1 : 0);
}

module.exports = {
  init,
  writeTemp,
};
