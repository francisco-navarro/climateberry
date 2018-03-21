let promise;

function temp() {
  if (promise) return promise;

  promise = new Promise((resolve) => {
    console.log('python read temp');
    try {
      const PythonShell = require('python-shell');
      const pyshell = new PythonShell('readtemperature.py', {
        // scriptPath: '/root/Adafruit_Python_DHT/examples/'
      });

      pyshell.on('message', (message) => {
        console.log(message);
        promise = undefined;
        try {
          resolve(JSON.parse(message));
        } catch (ex) {
          resolve({});
        }
      });

      // end the input stream and allow the process to exit
      pyshell.end((err) => {
        if (err) throw err;
      });
    } catch (err) {
      console.warn(err);
      promise = undefined;
      resolve({});
    }
  });

  return promise;
}

module.exports = {
  temp,
};
