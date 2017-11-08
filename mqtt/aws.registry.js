var awsIot = require('aws-iot-device-sdk');

//
// Replace the values of '<YourUniqueClientIdentifier>' and '<YourCustomEndpoint>'
// with a unique client identifier and custom host endpoint provided in AWS IoT cloud
//

var device = awsIot.device({
  keyPath: './certs/climateberry-client.private.key',
 certPath: './certs/climateberry-client.cert.pem',
   caPath: './root-CA.crt',
 clientId: 'arn:aws:iot:eu-west-2:691113450111:thing/climateberry-client',
     host: 'agfpnddpzypi9.iot.eu-west-2.amazonaws.com'
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