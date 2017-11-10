// Necesita;
// let switchService = new Service.Switch("Climateberry");
// switchService.getCharacteristic(Characteristic.On).on('get', this.getSwitchOnCharacteristic.bind(this)).on('set', this.setSwitchOnCharacteristic.bind(this));


// recoge si un interruptor está conectado o no
function getSwitchOnCharacteristic (next) {
  const me = this;
  request({
      url: me.getUrl,
      method: 'GET',
      json: true
  }, 
  function (error, response, body) {
    if (error) {
      me.log(error.message);
      return next(error);
    }
    return next(null, body.currentTemp);
  });
}
   
// enciende / apaga el interruptor
function setSwitchOnCharacteristic (on, next) {
  const me = this;
  me.log('Climateberry setSwitchOnCharacteristic: ');
  me.log(JSON.stringify(on));
  request({
    url: me.postUrl,
    json: {'targetState': on},
    method: 'POST',
    headers: {'Content-type': 'application/json'}
  },
  function (error, response) {
    if (error) {
      me.log(error.message);
      return next(error);
    }
    return next();
  });
}

module.exports = {
  getSwitchOnCharacteristic,
  setSwitchOnCharacteristic
};