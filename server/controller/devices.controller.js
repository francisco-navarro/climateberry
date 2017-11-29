const mqtt = require('./mqtt.controller');

function init() {
  console.log('Listening devices');
  // The objective is to add all the devices that have thing in aws iot
  mqtt.on('status', (thingName, stat, clientToken, stateObject) => {
    console.log('temperature received '+stat+' on '+thingName + ': ' +
                JSON.stringify(stateObject));
  });
}

module.exports = {
  init,
};
