const db = require('../db/db');
const io = require('../server/io');

let valueIO = false;

function get() {
  return {
    unit: 'C',
    actual: 23.5,
    desired: 23.5
  };
}

function put() {
  valueIO = !valueIO;
  io.writeTemp(valueIO);
}

module.exports = {
  get,
  put
}