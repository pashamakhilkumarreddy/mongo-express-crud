const { MongoClient } = require('mongodb');

const { ObjectID } = require('mongodb');

const config = require('../config');

const dbName = config.db.DB_NAME;

const url = config.db.DB_URL;

const mongoOptions = {
  useNewUrlParser: true,
};

const state = {
  db: null,
};

const connect = (cb) => {
  if (state.db) {
    cb();
  } else {
    MongoClient.connect(url, mongoOptions, (err, client) => {
      if (err) {
        cb(err);
      } else {
        state.db = client.db(dbName);
        cb();
      }
    });
  }
};

const getPrimaryKey = (_id) => ObjectID(_id);

const getDB = () => state.db;

module.exports = {
  getDB,
  connect,
  getPrimaryKey,
};
