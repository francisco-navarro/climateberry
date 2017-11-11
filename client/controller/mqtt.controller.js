const registry = require('../../mqtt/aws.registry');

let shadow = registry.newShadow(true);
const shadowName = 'ClimateBerry';

function update (status) {
  let clientTokenUpdate;
  let state = {state: {reported: status}};

  clientTokenUpdate = shadow.update(shadowName, state);

  if (clientTokenUpdate === null) console.warn('update shadow failed, operation still in progress');
}

function on () {
  return shadow.on;
}

module.exports = {
  update,
  on
};