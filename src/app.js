const express = require('express');
const path = require('path');
const db = require('./db');

const config = require('./config');

const app = express();

const PORT = config.server.PORT;

app.use(express.json());

app.use(express.urlencoded({ extended: true }))

app.use('/public', express.static(path.join(__dirname, 'static')))

require('./routes')(app);

db.connect(err => {
  if (err) {
    console.error('Unable to connect to the database');
    process.exit(1);
  } else {
    app.listen(PORT, '127.0.0.1' , () => {
      console.log(`The server is running on PORT: ${PORT}`);
    })
  }
})