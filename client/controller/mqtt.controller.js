const registry = require('../../mqtt/azure.registry');

let device;

registry('climateberry-device').then(res => device = res);
