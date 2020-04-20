const express = require('express');
const db = require('./db');

const config = require('./config');

const app = express();

const PORT = config.server.PORT;

app.use(express.json());

db.connect(err => {
  if (err) {
    console.error('Unable to connect to the database');
    process.exit(1);
  } else {
    app.listen(PORT, () => {
      console.log(`The server is running on PORT: ${PORT}`);
    })
  }
})