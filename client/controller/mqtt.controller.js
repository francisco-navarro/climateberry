const shadowName = 'ClimateBerry';
const enabled = false;

let registry;
let shadow;

let stub = {
  update: () => {},
  on: () => {},
  init: () => Promise.resolve()
};

function update(status) {
  let clientTokenUpdate;
  const state = { state: { reported: status } };

  clientTokenUpdate = shadow.update(shadowName, state);

  if (clientTokenUpdate === null) console.warn('update shadow failed, operation still in progress');
}

function on() {
  return shadow.on;
}

function init() {
  registry = require('../../mqtt/aws.registry');
  shadow = registry.newShadow(true);
  return Promise.resolve();
}

module.exports = enabled
 ? {
    update,
    on,
    init,
  } 
  : stub;
