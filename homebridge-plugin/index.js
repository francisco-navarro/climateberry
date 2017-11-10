const request = require('request');
const url = require('url');

let Service;
let Characteristic;

// config url in ~/.homebridge/config.json
// Reference types https://github.com/KhaosT/HAP-NodeJS/blob/master/lib/gen/HomeKitTypes.js#L3219

function myDevice(log, config) {
  this.log = log;
  this.getUrl = url.parse(config['getUrl']);
  this.postUrl = url.parse(config['postUrl']);
  this.name = config['name'];
}

myDevice.prototype = {
  getServices: function () {
    let services = [];
    let informationService = new Service.AccessoryInformation();
    informationService.setCharacteristic(Characteristic.Manufacturer, "Manufacturer RPi")
      .setCharacteristic(Characteristic.Model, "Climateberry Bridge")
      .setCharacteristic(Characteristic.SerialNumber, "123-456-789");
    // let switchService = new Service.Switch("Climateberry");
    // switchService.getCharacteristic(Characteristic.On).on('get', this.getSwitchOnCharacteristic.bind(this)).on('set', this.setSwitchOnCharacteristic.bind(this));

    this.temperatureService = new Service.Thermostat(this.name);
    this.temperatureService.getCharacteristic(Characteristic.CurrentTemperature)
      .on('get', this.getStateTemperature.bind(this));

    this.temperatureService.getCharacteristic(Characteristic.CurrentTemperature)
      .setProps({minValue: -50});
    
    this.temperatureService.getCharacteristic(Characteristic.CurrentTemperature)
      .setProps({maxValue: 50});

    this.temperatureService.getCharacteristic(Characteristic.CurrentHeatingCoolingState)
      .on('get', this.getCurrentHeatingCoolingState.bind(this));
  
    this.temperatureService.getCharacteristic(Characteristic.TargetHeatingCoolingState)
      .on('get', this.getCurrentHeatingCoolingState.bind(this))
			.on('set', this.setTargetHeatingCoolingState.bind(this));

    this.temperatureService.getCharacteristic(Characteristic.TargetTemperature)
      .on('get', this.getTargetTemperature.bind(this))
			.on('set', this.setTargetTemperature.bind(this));

    this.temperatureService.getCharacteristic(Characteristic.TemperatureDisplayUnits)
      .on('get', this.getTemperatureDisplayUnits.bind(this))
			.on('set', this.setTemperatureDisplayUnits.bind(this));

    services.push(this.temperatureService);
    services.push(this.informationService);
    return services;
  },

  getStateTemperature: function(next) {
    const me = this;
    request({
      url: me.getUrl,
      method: 'GET',
      json: true
    }, 
    function (error, response, body) {
      if (error) {
        me.log(error.message);
        return next(error);
      }
      return next(null, body.currentTemp);
    });
  },

  getStateHumidity: function(next) {
    const me = this;
    request({
      url: me.getUrl,
      method: 'GET',
      json: true
    }, 
    function (error, response, body) {
      if (error) {
        me.log(error.message);
        return next(error);
      }
      return next(null, body.currentHumidity);
    });
  },

  getTargetTemperature: function(next) {
    const me = this;
    request({
      url: me.getUrl,
      method: 'GET',
      json: true
    }, 
    function (error, response, body) {
      if (error) {
        me.log(error.message);
        return next(error);
      }
      return next(null, body.targetTemperature);
    });
  },

  setTargetTemperature: function (temp, next) {
    const me = this;
    me.log('Climateberry TargetTemperature ', temp);
    request({
      url: me.postUrl,
      json: {'targetTemperature': temp},
      method: 'POST',
      headers: {'Content-type': 'application/json'}
    },
    function (error, response) {
      if (error) {
        me.log(error.message);
        return next(error);
      }
      return next();
    });
  },

  getTemperatureDisplayUnits: function(next) {
    next(null, Characteristic.TemperatureDisplayUnits.CELSIUS);
  },

  setTemperatureDisplayUnits: function(next) {
    next(null, Characteristic.TemperatureDisplayUnits.CELSIUS);
  },

  getCurrentHeatingCoolingState: function(next) {
    const me = this;
    this.log("getCurrentHeatingCoolingState ");
    request({
      url: me.getUrl,
      method: 'GET',
      json: true
    }, 
    function (error, response, body) {
      if (error) {
        me.log(error.message);
        return next(error);
      }
      if (response.body.heatingState) {
        // Si está encendido
        this.state = Characteristic.CurrentHeatingCoolingState.HEAT;
        this.targetHeatingCoolingState = Characteristic.TargetHeatingCoolingState.HEAT;
      } else {
        // Si está apagado:
        this.state = Characteristic.CurrentHeatingCoolingState.OFF;
        this.targetHeatingCoolingState = Characteristic.TargetHeatingCoolingState.OFF;
      }
      return next(null, body.mode);
    });
  },

  setTargetHeatingCoolingState: function(state, next) {
    const me = this;
    me.log('Climateberry change HeatingCooling state: ', state);
    request({
      url: me.postUrl,
      json: {'heatingState': state},
      method: 'POST',
      headers: {'Content-type': 'application/json'}
    },
    function (error, response) {
      if (error) {
        me.log(error.message);
        return next(error);
      }
      return next();
    });
  },

  // recoge si un interruptor está conectado o no
  getSwitchOnCharacteristic: function (next) {
    const me = this;
    request({
        url: me.getUrl,
        method: 'GET',
        json: true
    }, 
    function (error, response, body) {
      if (error) {
        me.log(error.message);
        return next(error);
      }
      return next(null, body.currentTemp);
    });
  },
   
  // enciende / apaga el interruptor
  setSwitchOnCharacteristic: function (on, next) {
    const me = this;
    me.log('Climateberry setSwitchOnCharacteristic: ');
    me.log(JSON.stringify(on));
    request({
      url: me.postUrl,
      json: {'targetState': on},
      method: 'POST',
      headers: {'Content-type': 'application/json'}
    },
    function (error, response) {
      if (error) {
        me.log(error.message);
        return next(error);
      }
      return next();
    });
  }
};

module.exports = function (homebridge) {
 Service = homebridge.hap.Service;
 Characteristic = homebridge.hap.Characteristic;
 homebridge.registerAccessory("homebridge-climateberry-plugin", "Climateberry", myDevice);
};