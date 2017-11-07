const registry = require('../../mqtt/mqtt.registry');

let device;

registry('climateberry-device').then(res => device = res);
