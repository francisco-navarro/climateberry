const request = require('request');
const url = require('url');

let Service;
let Characteristic;

// config url in ~/.homebridge/config.json

function mySwitch(log, config) {
  this.log = log;
  this.getUrl = url.parse(config['getUrl']);
  this.postUrl = url.parse(config['postUrl']);
  this.name = config['name'];
}

mySwitch.prototype = {
  getServices: function () {
    let services = [];
    let informationService = new Service.AccessoryInformation();
    informationService
    .setCharacteristic(Characteristic.Manufacturer, "Manufacturer RPi")
    .setCharacteristic(Characteristic.Model, "Climateberry Bridge")
    .setCharacteristic(Characteristic.SerialNumber, "123-456-789");
    
    // let switchService = new Service.Switch("Climateberry");
    // switchService
    //   .getCharacteristic(Characteristic.On)
    //   .on('get', this.getSwitchOnCharacteristic.bind(this))
    //   .on('set', this.setSwitchOnCharacteristic.bind(this));

    this.temperatureService = new Service.TemperatureSensor(this.name);
    this.temperatureService
      .getCharacteristic(Characteristic.CurrentTemperature)
      .on('get', this.getStateTemperature.bind(this));

    this.temperatureService
      .getCharacteristic(Characteristic.CurrentTemperature)
      .setProps({minValue: -50});
    
    this.temperatureService
      .getCharacteristic(Characteristic.CurrentTemperature)
      .setProps({maxValue: 50});
      services.push(this.temperatureService);

    this.humidityService = new Service.HumiditySensor(this.name);
    this.humidityService
      .getCharacteristic(Characteristic.CurrentRelativeHumidity)
      .on('get', this.getStateHumidity.bind(this));
    services.push(this.humidityService);

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
      return next(null, body.currentState);
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
 homebridge.registerAccessory("homebridge-climateberry-plugin", "Climateberry", mySwitch);
};