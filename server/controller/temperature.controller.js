
let unit ='C';
let actual = 19;
let desired = 19;
let outside = 12;

// TODO : Este controlador actualmente esta obsoleto hasta que se añada mqtt

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