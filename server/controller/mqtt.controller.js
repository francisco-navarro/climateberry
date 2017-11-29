const registry = require('../../mqtt/aws.registry');

const shadow = registry.newShadow(true);
const shadowName = 'ClimateBerry';

function update(status) {
  const state = { state: { reported: status } };
  const clientTokenUpdate = shadow.update(shadowName, state);

  if (clientTokenUpdate === null) {
    console.warn('update shadow failed, operation still in progress');
  }
}

function on() {
  return shadow.on;
}

module.exports = {
  update,
  on,
};
