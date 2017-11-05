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
  if (status.target + threshold > status.temperature) {
    status.hState = HeatingState.HEAT;
    io.writeTemp(true);
  } else if (status.temperature + threshold >= status.target) {
    status.hState = HeatingState.OFF;
    io.writeTemp(false);
  }
  console.log('Reading temperature. Heating state ' + status.hState);
}

function getStatus() {
  return {
    currentTemp: status.temperature,
    targetTemperature: status.target,
    heatingState: status.hState
  };
}

function setTarget(hState, temperature) {
  if(temperature) status.target = temperature;
  if(hState) status.hState = hState;
}

function order (req, res) {
  hState = req.body.heatingState;
  targetTemperature = req.body.targetTemperature || 20;
  return res.json({currentState: status});
}

setInterval(update, TIMEOUT);

module.exports = {
  getStatus,
  setTarget
};