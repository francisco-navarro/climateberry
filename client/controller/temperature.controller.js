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
const threshold = 0.3;
const status = {
  temperature: 21.5,
  humidity: 50,
  target: 20,
  hState: HeatingState.OFF,
};


function thermostatIsOn() {
  return status.hState > 0;
}

function isInThreshold() {
  // No se enciende ni se apaga si el objetivo y el actual son aproximadamente iguales
  return Math.abs(status.target - status.temperature) <= threshold;
}
function isBelowTarget() {
  return status.temperature < status.target;
}
function isOverTarget() {
  return status.temperature >= status.target();
}

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
    if (thermostatIsOn()) {
      if (isInThreshold()) {
        // No hacemos nada
      } else if (isBelowTarget()) {
        io.writeTemp(true);
      } else {
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
