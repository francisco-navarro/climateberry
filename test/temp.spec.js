var PythonShell = require('python-shell');
var pyshell = new PythonShell('temperature.py', {
  scriptPath: '/root/Adafruit_Python_DHT/examples/'
});

pyshell.on('message', function (message) {
  var out = message.split(',');
  var temp = out[0].split('=');
  console.log(temp);
});

// end the input stream and allow the process to exit
pyshell.end(function (err) {
  if (err) throw err;
  console.log('Adafruit finished');
});