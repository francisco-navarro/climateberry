const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080;

const program = require('./server/index')(app);

app.listen(PORT, () => 
  console.log(`app started in ${PORT}`)
);