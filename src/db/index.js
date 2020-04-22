const Promise = require('bluebird');

const mongoClient = Promise.promisifyAll(require('mongodb')).MongoClient;

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

// const connect = (cb) => {
//   if (state.db) {
//     cb();
//     console.log(cb.toString());
//   } else {
//     MongoClient.connect(url, mongoOptions, (err, client) => {
//       if (err) {
//         cb(err);
//       } else {
//         state.db = client.db(dbName);
//         console.log(cb.toString());
//         cb();
//       }
//     });
//   }
// };

const connect = async (cb) => {
  try {
    if (state.db) {
      cb();
    } else {
      const isMongoConnected = await mongoClient.connectAsync(url, mongoOptions);
      if (isMongoConnected) {
        state.db = isMongoConnected.db(dbName);
        cb();
      }
    }
  } catch (err) {
    console.error(err);
  }
};

const getPrimaryKey = (_id) => ObjectID(_id);

const getDB = () => state.db;

module.exports = {
  getDB,
  connect,
  getPrimaryKey,
};
