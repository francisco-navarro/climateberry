function temp() {
  return new Promise((resolve, reject) => {
    try {
      const PythonShell = require('python-shell');
      const pyshell = new PythonShell('readtemperature.py', {
        // scriptPath: '/root/Adafruit_Python_DHT/examples/'
      });

      pyshell.on('message', (message) => {
        console.log(message);
	try{
		resolve(JSON.parse(message));
	}catch(ex) {
		resolve({})
	}
      });

      // end the input stream and allow the process to exit
      pyshell.end((err) => {
        if (err) throw err;
      });
    } catch (err) {
      console.warn(err);
      reject(err);
    }
  });
}

module.exports = {
  temp,
};
