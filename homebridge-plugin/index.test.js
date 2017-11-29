const index = require('./index');

const homebridgeMock = {
  hap: {},
  registerAccessory() {
    mySwitchFn = arguments[2];
  },
};

const config = {
  accessory: 'MyAwesomeClimateberry',
  name: 'switch1',
  getUrl: 'http://localhost:8080/api/status',
  postUrl: 'http://localhost:8080/api/order',
};
let mySwitchFn;

index(homebridgeMock);

let mySwitch = new mySwitchFn(console.log, config);
mySwitch.getStateTemperature((err, t) => console.log('next ', t));
