const db = require('../../db/db');

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