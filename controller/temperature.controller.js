const db = require('../db/db');

function get() {
  return {
    unit: 'C',
    actual: 23.5,
    desired: 23.5
  };
}

module.exports = {
  get
}