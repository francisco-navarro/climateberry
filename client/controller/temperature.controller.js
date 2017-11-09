const io = require('./io.controller');
const mqtt = require('./mqtt.controller');
const TIMEOUT =  60 * 1000;
const HeatingState = {
  OFF: 0,
  HEAT: 1,
  COLD: 2,
  AUTO: 3
};
const threshold = 0;
const status = {
  temperature: 21.5,
  target: 22,
  hState: HeatingState.OFF
};

function update() {
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
}

function getStatus() {
  return {
    currentTemp: status.temperature,
    targetTemperature: status.target,
    heatingState: status.hState
  };
}

function setTarget(hState, temperature) {
  if(temperature) {
    status.target = temperature;
  }
  if(hState !== undefined) {
    status.hState = hState;
  }
  update();
}

setInterval(update, TIMEOUT);

module.exports = {
  getStatus,
  setTarget
};