const io = require('./io.controller');
const mqtt = require('./mqtt.controller');
const sensor = require('./sensor.controller');

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

function update() {
  sensor.temp(actual => status.temperature = actual);
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
  update();
}

mqtt.on('status', (thingName, stat, clientToken, stateObject) => {
  console.log('temperature received '+stat+' on '+thingName+': '+
              JSON.stringify(stateObject));
});

setInterval(update, TIMEOUT);

module.exports = {
  getStatus,
  setTarget,
};
