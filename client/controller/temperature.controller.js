let io;
let mqtt;
let sensor;

const TIMEOUT = 30 * 1000;
const HeatingState = {
  OFF: 0,
  HEAT: 1,
  COLD: 2,
  AUTO: 3,
};
const threshold = 0.5;
const status = {
  temperature: 21.5,
  target: 22,
  hState: HeatingState.OFF,
};

function init() {
  io = require('./io.controller');
  mqtt = require('./mqtt.controller');
  sensor = require('./sensor.controller');

  return Promise.all([
    io.init(),
    mqtt.init(),
  ]).then(() => {
    mqtt.on('status', (thingName, stat, clientToken, stateObject) => {
      console.log(`temperature received ${stat} on ${thingName}:
        ${JSON.stringify(stateObject)}`);
    });
  }).catch(err => console.warn);
}

function update() {
  return sensor.temp().then((actual) => {
    status.temperature = actual;
    status.hState = 0 + status.hState;
    if (status.hState > 0) {
      if (status.target + threshold > status.temperature) {
        io.writeTemp(true);
      } else if (status.temperature + threshold >= status.target) {
        io.writeTemp(false);
      }
    } else {
      console.log('apagado');
      io.writeTemp(false);
    }
    mqtt.update(status);
  });
}

function getStatus() {
  return {
    currentTemp: status.temperature,
    targetTemperature: status.target,
    heatingState: status.hState,
  };
}

function setTarget(hState, temperature) {
  if (temperature) {
    status.target = temperature;
  }
  if (hState !== undefined) {
    status.hState = hState;
  }
  return update();
}


setInterval(update, TIMEOUT);

module.exports = {
  getStatus,
  setTarget,
  init,
};
