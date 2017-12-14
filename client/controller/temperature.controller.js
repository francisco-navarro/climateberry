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
const threshold = 0.4;
const status = {
  temperature: 21.5,
  humidity: 50,
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
    console.log('Temperature controller initialized');
    setInterval(update, TIMEOUT);
    mqtt.on('status', (thingName, stat, clientToken, stateObject) => {
      console.log(`temperature received ${stat} on ${thingName}:
        ${JSON.stringify(stateObject)}`);
    });
  }).catch(err => console.log('Error starting temperature controller', err));
}

function update() {
  return sensor.temp().then((actual) => {
    status.temperature = actual.temp;
    status.humidity = actual.humidity;
    status.hState = 0 + status.hState;
    if (status.hState > 0) {
      if (status.target > status.temperature + threshold) {
        io.writeTemp(true);
      } else if (status.temperature < status.target) {
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
    humidity: status.humidity,
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

module.exports = {
  getStatus,
  setTarget,
  init,
};
