const io = require('./io.controller');
const TIMEOUT = 60 * 1000;
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
  if (status.hState) {
    if (status.target + threshold > status.temperature) {
      io.writeTemp(true);
    } else if (status.temperature + threshold >= status.target) {
      io.writeTemp(false);
    }
  } else {
    console.log('apagado');
    io.writeTemp(false);
  }
}

function getStatus() {
  return {
    currentTemp: status.temperature,
    targetTemperature: status.target,
    heatingState: status.hState
  };
}

function setTarget(hState, temperature) {
  console.log('setTarget hState ', hState);
  console.log('setTarget temperature ', temperature);
  if(temperature) status.target = temperature;
  if(hState) status.hState = hState;
  update();
}

setInterval(update, TIMEOUT);

module.exports = {
  getStatus,
  setTarget
};