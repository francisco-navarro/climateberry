const config = require('../../config').gpio;
const fs = require('fs');

function setDirection(pin, direction) {
  console.log(`${pin} -> ${direction}`);
  return new Promise((resolve, reject) => {
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
  console.log(`Export pin ${pin} ${direction}`);
  return new Promise((resolve, reject) => {
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
  return new Promise((resolve, reject) => {
    console.log(`\t gpio.writing ${pin} ${value}`);
    fs.writeFile(`${config.path}/gpio${pin}/value`, value, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function init() {
  console.warn('Execute with sudo for access to gpio');
  return Promise.all([
    exportPin(config.relayPin, 'out')
      .catch(err => console.error('Error exporting relay pin', err)),
    exportPin(config.temperaturePin, 'in')
      .catch(err => console.error('Error exporting temperature pin', err))
  ]);
}

function writeTemp(value) {
  return write(config.relayPin, value ? 1 : 0);
}

module.exports = {
  init,
  writeTemp,
};
