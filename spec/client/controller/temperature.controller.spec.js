const temperatureController = require('../../../client/controller/temperature.controller');
const ioController = require('../../../client/controller/io.controller');
const mqtt = require('../../../client/controller/mqtt.controller');
const sensor = require('../../../client/controller/sensor.controller');

describe('Tests temperature control with external info', () => {
  let actual;
  let expected;

  beforeEach((done) => {
    spyOn(ioController, 'init').and.returnValue(Promise.resolve());
    spyOn(mqtt, 'init').and.returnValue(Promise.resolve());
    spyOn(mqtt, 'on').and.stub();
    temperatureController.init().then(done);
  });

  it('expect to init get the temperature', () => {
    actual = temperatureController.getStatus();
    expected = {
      currentTemp: 21.5,
      targetTemperature: 22,
      heatingState: 0,
    };
    expect(actual).toEqual(expected);
  });

  it('expect to change the temperature and status', (done) => {
    spyOn(sensor, 'temp').and.returnValue(
      Promise.resolve(17));
    spyOn(mqtt, 'update').and.stub();

    temperatureController.setTarget(1, 30).then((value) => {
      actual = temperatureController.getStatus();
      expected = {
        currentTemp: 17,
        targetTemperature: 30,
        heatingState: 1,
      };
      expect(actual).toEqual(expected);
      expect(mqtt.update).toHaveBeenCalled();
      done();
    });

  });
});
