const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080;
const clientMode = process.argv.some(arg => arg == 'client');

if (clientMode) {
  require('./client/index')(app)
} else {
  require('./server/index')(app)
}

app.listen(PORT, () => 
  console.log(`Climateberry started in ${PORT}`)
);