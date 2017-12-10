const request = require('request');

function getFromUrl (next, field) {
  const me = this;
  request({
    url: me.getUrl,
    method: 'GET',
    json: true,
  },
  function (error, response, body) {
    if (error) {
      me.log(error.message);
      return next(error);
    }
    return next(null, body[field]);
  });
}

function getStateTemperature(next) {
  getFromUrl.call(this, next, 'currentTemp');
}

function getStateHumidity(next) {
  getFromUrl.call(this, next, 'humidity');
}

function getTargetTemperature(next) {
  getFromUrl.call(this, next, 'targetTemperature');
}

function setTargetTemperature(temp, next) {
  const me = this;
  me.log('Climateberry TargetTemperature ', temp);
  request({
      url: me.postUrl,
      json: {
        'targetTemperature': temp,
      },
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
    },
    function (error, response) {
      if (error) {
        me.log(error.message);
        return next(error);
      }
      return next();
    });
}

function getTemperatureDisplayUnits(next) {
  next(null, this.units);
}

function setTemperatureDisplayUnits(next) {
  next(null, this.units);
}

function getCurrentHeatingCoolingState(next) {
  const me = this;
  this.log("getCurrentHeatingCoolingState ");
  request({
      url: me.getUrl,
      method: 'GET',
      json: true,
    },
    function (error, response, body) {
      if (error) {
        me.log(error.message);
        return next(error);
      }
      if (response.body.heatingState) {
        // Si está encendido
        me.state = me.CurrentHeatingCoolingState.HEAT;
        me.targetHeatingCoolingState = me.TargetHeatingCoolingState.HEAT;
      } else {
        // Si está apagado:
        me.state = me.CurrentHeatingCoolingState.OFF;
        me.targetHeatingCoolingState = me.TargetHeatingCoolingState.OFF;
      }
      return next(null, body.mode);
    });
}

function setTargetHeatingCoolingState(state, next) {
  const me = this;
  me.log('Climateberry change HeatingCooling state: ', state);
  request({
      url: me.postUrl,
      json: {
        'heatingState': state,
      },
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
    },
    function (error, response) {
      if (error) {
        me.log(error.message);
        return next(error);
      }
      return next();
    });
}

module.exports = {
  getStateTemperature,
  getStateHumidity,
  getTargetTemperature,
  setTargetTemperature,
  getTemperatureDisplayUnits,
  setTemperatureDisplayUnits,
  getCurrentHeatingCoolingState,
  setTargetHeatingCoolingState,
};
