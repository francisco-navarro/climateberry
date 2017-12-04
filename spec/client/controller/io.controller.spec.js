const ioController = require('../../../client/controller/io.controller');
const config = require('../../../config').gpio;
const os = require('os');
const fs = require('fs');

describe('client tests for api in raspberry', () => {
  let actual;
  let expected;

  config.path = createFakeDirs(config.path);

  beforeEach(done =>
    ioController.init().then(done));

  it('should init without permissions', () => {
    // Arrange
    console.log('should get the state');
    // Act

    // Assert
    // echo out > /sys/class/gpio/gpio18/direction
    actual = fs.readFileSync(`${config.path}/gpio${config.relayPin}/direction`, 'utf-8');
    expected = 'out';
    expect(actual).toBe(expected);

    // echo in > /sys/class/gpio/gpio23/direction
    actual = fs.readFileSync(`${config.path}/gpio${config.temperaturePin}/direction`, 'utf-8');
    expected = 'in';
    expect(actual).toBe(expected);
  });
  it('should write true to temperature', (done) => {
    // Act
    ioController.writeTemp(true).then(() => {
      // Assert
      actual = fs.readFileSync(`${config.path}/gpio${config.relayPin}/value`, 'utf-8');
      expected = '1';
      expect(actual).toBe(expected);
      done();
    });
  });
  it('should write false to temperature', (done) => {
    // Act
    ioController.writeTemp(false).then(() => {
      // Assert
      actual = fs.readFileSync(`${config.path}/gpio${config.relayPin}/value`, 'utf-8');
      expected = '0';
      expect(actual).toBe(expected);
      done();
    });
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
