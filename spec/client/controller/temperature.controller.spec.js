const temperatureController = require('../../../client/controller/temperature.controller');
const ioController = require('../../../client/controller/io.controller');

describe('Tests input output GPIO in raspberry', () => {
  let actual;
  let expected;

  beforeEach((done) => {
    spyOn(ioController, 'init').and.stub();
    temperatureController.init().then(done);
  });
  it('expect to init get the temperature', (done) => {
    actual = temperatureController.getStatus();
    expected = {
      currentTemp: 21-5,
      targetTemperature: 22,
      heatingState: 0,
    };
    expect(actual).toBe(expected);
  });
});
