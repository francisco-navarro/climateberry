const ioController = require('../../../client/controller/io.controller');
const config = require('../../../config').gpio;
const os = require('os');
const fs = require('fs');

describe('client tests for api in raspberry', () => {
  beforeEach(() => {
    config.path = os.tmpdir() + config.path;
    
    ioController.init();
  });

  it('should init without permissions', () => {
    // Arrange
    console.log('should get the state');
    // Act

    // Assert

    // echo out > /sys/class/gpio/gpio18/direction
    fs.stat(`${path}/gpio${config.relayPin}/direction`);

    // echo 18 > /sys/class/gpio/export
    // echo 23 > /sys/class/gpio/export
    // echo in > /sys/class/gpio/gpio23/direction
  });
  it('should write true to temperature', () => {
    // Arrange
    console.log('should get the state');
    // Act
    ioController.writeTemp();
    // Assert
  });
  it('should write false to temperature', () => {
    // Arrange
    console.log('should get the state');
    // Act
    ioController.writeTemp();
    // Assert
  });
});
