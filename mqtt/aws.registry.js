const awsIot = require('aws-iot-device-sdk');
const config = {
  keyPath: './certs/climateberry-client.private.key',
 certPath: './certs/climateberry-client.cert.pem',
   caPath: './root-CA.crt',
 clientId: process.env.AWS_IOT_CLIENT_ID,
     host: process.env.AWS_IOT_HOST
};

const thingName = 'ClimateBerry';

function newDevice () {
  let device = awsIot.device(config);
  
  device.on('connect', function() {
     console.log('connect');
  });
  device.on('close', function() {
     console.log('close');
  });
  device.on('reconnect', function() {
     console.log('reconnect');
  });
  device.on('offline', function() {
     console.log('offline');
  });
  device.on('error', function(error) {
     console.log('error', error);
  });
  device.on('message', function(topic, payload) {
     console.log('message', topic, payload.toString());
  });

  return device;
}

function newShadow(ignoreDeltas) {
  let shadow = awsIot.thingShadow(config);
  let shadowName = thingName;

  // Client token value returned from thingShadows.update() operation
  let clientTokenUpdate;

  shadow.on('connect', function() {
    // después de conectar registra en aws iot con el nombre
    shadow.register(shadowName, {ignoreDeltas}, function() {
      let state = {state: {reported: {temp: temp}}};
      clientTokenUpdate = shadow.update(shadowName, state);
      if (clientTokenUpdate === null) console.warn('update shadow failed, operation still in progress');
    });
  });

  shadow.on('status', 
    function(thingName, stat, clientToken, stateObject) {
      console.log('received '+stat+' on '+thingName+': '+
                  JSON.stringify(stateObject));
    //  report the status of update(), get(), and delete() 
  });

  shadow.on('delta', 
    function(thingName, stateObject) {
      console.log('received delta on '+thingName+': '+
                  JSON.stringify(stateObject));
    });

  return shadow;
}
//Api shadow para publicar topics
//https://agfpnddpzypi9.iot.eu-west-2.amazonaws.com/things/thingName/shadow

module.exports = {
  newDevice,
  newShadow
};
