const request = require('request');
const url = require('url');

let Service;
let Characteristic;

// config url in ~/.homebridge/config.json


function mySwitch(log, config) {
  this.log = log;
  this.getUrl = url.parse(config['getUrl']);
  this.postUrl = url.parse(config['postUrl']);
}

mySwitch.prototype = {
  getServices: function () {
    let informationService = new Service.AccessoryInformation();
    informationService
    .setCharacteristic(Characteristic.Manufacturer, "Manufacturer RPi")
    .setCharacteristic(Characteristic.Model, "My switch model")
    .setCharacteristic(Characteristic.SerialNumber, "123-456-789");
    
    let switchService = new Service.Switch("My switch");
    switchService
    .getCharacteristic(Characteristic.On)
    .on('get', this.getSwitchOnCharacteristic.bind(this))
    .on('set', this.setSwitchOnCharacteristic.bind(this));
    
    this.informationService = informationService;
    this.switchService = switchService;
    return [informationService, switchService];
  },
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
 homebridge.registerAccessory("switch-plugin", "MyAwesomeSwitch", mySwitch);
};