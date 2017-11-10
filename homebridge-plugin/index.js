const url = require('url');
const temperature = require('./services/temperature');

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
    let switchService = new Service.Switch("Climateberry");
    switchService.getCharacteristic(Characteristic.On).on('get', this.getSwitchOnCharacteristic.bind(this)).on('set', this.setSwitchOnCharacteristic.bind(this));

    this.temperatureService = new Service.Thermostat(this.name);
    this.temperatureService.getCharacteristic(Characteristic.CurrentTemperature)
      .on('get', temperature.getStateTemperature.bind(this));

    this.temperatureService.getCharacteristic(Characteristic.CurrentTemperature)
      .setProps({minValue: -50});
    
    this.temperatureService.getCharacteristic(Characteristic.CurrentTemperature)
      .setProps({maxValue: 50});

    this.temperatureService.getCharacteristic(Characteristic.CurrentHeatingCoolingState)
      .on('get', temperature.getCurrentHeatingCoolingState.bind(this));
  
    this.temperatureService.getCharacteristic(Characteristic.TargetHeatingCoolingState)
      .on('get', temperature.getCurrentHeatingCoolingState.bind(this))
			.on('set', temperature.setTargetHeatingCoolingState.bind(this));

    this.temperatureService.getCharacteristic(Characteristic.TargetTemperature)
      .on('get', temperature.getTargetTemperature.bind(this))
			.on('set', temperature.setTargetTemperature.bind(this));

    this.temperatureService.getCharacteristic(Characteristic.TemperatureDisplayUnits)
      .on('get', temperature.getTemperatureDisplayUnits.bind(this))
			.on('set', temperature.setTemperatureDisplayUnits.bind(this));

    services.push(this.temperatureService);
    services.push(this.informationService);
    return services;
  }
};

module.exports = function (homebridge) {
 Service = homebridge.hap.Service;
 Characteristic = homebridge.hap.Characteristic;
 homebridge.registerAccessory("homebridge-climateberry-plugin", "Climateberry", myDevice);
};