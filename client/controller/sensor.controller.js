
function temp(callback) {
  return new Promise((resolve, reject) => {
    try {
      const PythonShell = require('python-shell');
      const pyshell = new PythonShell('readtemperature.py', {
        // scriptPath: '/root/Adafruit_Python_DHT/examples/'
      });
      
      pyshell.on('message', function (message) {
        console.log(message);
        var out = message.split(' ');
        var temp = out[0].split('=');
        console.log(message);
        resolve(temp[1]);
      });
      
      // end the input stream and allow the process to exit
      pyshell.end(function (err) {
        if (err) throw err;
      });
      
    } catch(err) {
      console.warn(err);
      reject(err);
    }
  });
}

module.exports = {
  temp
};