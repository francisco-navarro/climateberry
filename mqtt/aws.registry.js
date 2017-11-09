var awsIot = require('aws-iot-device-sdk');


function newDevice () {
  var device = awsIot.device({
    keyPath: './certs/climateberry-client.private.key',
   certPath: './certs/climateberry-client.cert.pem',
     caPath: './root-CA.crt',
   clientId: process.env.AWS_IOT_CLIENT_ID,
       host: process.env.AWS_IOT_HOST
  });
  
  device
  .on('connect', function() {
     console.log('connect');
  });
  device
  .on('close', function() {
     console.log('close');
  });
  device
  .on('reconnect', function() {
     console.log('reconnect');
  });
  device
  .on('offline', function() {
     console.log('offline');
  });
  device
  .on('error', function(error) {
     console.log('error', error);
  });
  device
  .on('message', function(topic, payload) {
     console.log('message', topic, payload.toString());
  });
}

function newShadow() {

}

//Api shadow para publicar topics
//https://agfpnddpzypi9.iot.eu-west-2.amazonaws.com/things/thingName/shadow

module.exports = {
  newDevice,
  newShadow
};
