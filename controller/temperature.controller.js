const db = require('../db/db');
const io = require('./io');

let unit ='C';
let actual = 23.5;
let desired = 23.5;
let outside = 12;

function get() {
  return {
    unit,
    actual,
    desired,
    outside
  };
}

function put(req) {
  if (req.body.desired) {
    desired = req.body.desired;
    io.writeTemp(desired>actual);
  }
  return {
    unit,
    actual,
    desired
  };
}

module.exports = {
  get,
  put
}