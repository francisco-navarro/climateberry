var iothub = require('azure-iothub');

var connectionString = 'HostName=iot-hub-pako.azure-devices.net;';
var registryAccessKey = process.env.IOT_REGISTRY_KEY;
var registry = iothub.Registry.fromConnectionString(connectionString + 'SharedAccessKeyName=registryReadWrite;' + registryAccessKey);

function register(name) {
  return new Promise((resolve, reject) => {
    //Es necesario crear una entidad en el registro de entidades para conectar
    let device = {
      deviceId: name
    };

    registry.create(device, (err, deviceInfo, res) => {
      // con el mismo devideId, nos da la misma device key
      if (err) {
        reject(err);
      }
      if (deviceInfo) {
        console.log('Device ID: ' + deviceInfo.deviceId);
        console.log('Device key: ' + deviceInfo.authentication.symmetricKey.primaryKey);
        resolve(deviceInfo);
      }
    });
  });
}

module.exports = register;