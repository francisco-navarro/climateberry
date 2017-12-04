const registry = require('../../mqtt/aws.registry');

const shadow = registry.newShadow(true);
const shadowName = 'ClimateBerry';

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
  return Promise.resolve();
}

module.exports = {
  update,
  on,
  init,
};
