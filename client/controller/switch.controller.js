const rp = require('request-promise');

const url = 'http://192.168.1.139/';

function tvOff() {
  return rp({
    url: `${url}led/on`,
    timeout: 1000,
  })
    .then(() => ({ state: 1 }))
    .catch(() => ({ state: 0 }));
}

function tvState() {
  return rp({
    url,
    timeout: 1000,
  })
    .then(() => ({ state: 1 }))
    .catch(() => ({ state: 0 }));
}

module.exports = {
  tvOff,
  tvState,
};
