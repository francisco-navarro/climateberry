const ioController = require('../../../client/controller/io.controller');
const config = require('../../../config').gpio;
const os = require('os');
const fs = require('fs');

describe('client tests for api in raspberry', () => {
  config.path = createFakeDirs(config.path);

  beforeEach(done =>
    ioController.init().then(done));

  it('should init without permissions', () => {
    // Arrange
    console.log('should get the state');
    // Act

    // Assert

    // echo 18 > /sys/class/gpio/export
    // echo 23 > /sys/class/gpio/export

    // echo out > /sys/class/gpio/gpio18/direction
    fs.statSync(`${config.path}/gpio${config.relayPin}/direction`);

    // echo in > /sys/class/gpio/gpio23/direction
    fs.statSync(`${config.path}/gpio${config.relayPin}/direction`);
  });
  xit('should write true to temperature', () => {
    // Arrange
    console.log('should get the state');
    // Act
    ioController.writeTemp();
    // Assert
  });
  xit('should write false to temperature', () => {
    // Arrange
    console.log('should get the state');
    // Act
    ioController.writeTemp();
    // Assert
  });
});

function createFakeDirs(path) {
  const fullpath = path.split('/').reduce((prev, folder) => {
    const nextPath = `${prev}/${folder}`;
    if (!fs.existsSync(nextPath)) {
      fs.mkdirSync(`${prev}/${folder}`);
    }
    return nextPath;
  }, os.tmpdir());
  fs.writeFileSync(`${fullpath}export`, '');

  if (!fs.existsSync(`${fullpath}/gpio18`)) {
    fs.mkdirSync(`${fullpath}/gpio18`);
  }
  if (!fs.existsSync(`${fullpath}/gpio23`)) {
    fs.mkdirSync(`${fullpath}/gpio23`);
  }
  return fullpath;
}
