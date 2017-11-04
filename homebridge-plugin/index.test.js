const index = require('./index');

const homebridgeMock = {
  hap: {},
  registerAccessory: function() {
    mySwitchFn = arguments[2];
  }
};
const config = {
  "accessory": "MyAwesomeSwitch",
  "name": "switch1",
  "getUrl": "http://localhost:8080/api/status",
  "postUrl": "http://localhost:8080/api/order"
};
let mySwitchFn;

index(homebridgeMock);

var mySwitch = new mySwitchFn(console.log, config);
mySwitch.getStateTemperature((err, t)=> console.log('next ', t));