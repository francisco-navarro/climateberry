const express = require('express');
const bodyParser = require('body-parser');
const clientIndex = require('./client/index');
const serverIndex = require('./server/index');

const app = express();
const PORT = process.env.PORT || 8080;
const clientMode = process.argv.some(arg => arg === 'client');

app.use(bodyParser.json());

if (clientMode) {
  clientIndex(app);
} else {
  serverIndex(app);
}

app.listen(PORT, () =>
  console.log(`Climateberry started in ${PORT}`));
