var PythonShell = require('python-shell');
var script = '/root/Adafruit_Python_DHT/examples/temperature.py';

PythonShell.run(script, function (err) {
  if (err) throw err;
  console.log('finished');
});

PythonShell.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement)
  console.log(message);
});