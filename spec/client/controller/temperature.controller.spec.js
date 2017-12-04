const temperatureController = require('../../../client/controller/temperature.controller');
const ioController = require('../../../client/controller/io.controller');

describe('Tests input output GPIO in raspberry', () => {
  beforeEach(() => {
    spyOn(ioController, 'init').and.stub();
  });
  it('expect to init the controllers', (done) => {
    temperatureController.init();
  });
});
