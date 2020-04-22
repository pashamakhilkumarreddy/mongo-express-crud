require('dotenv').config();

console.log(process.env.PORT);

module.exports = {
  server: {
    PORT: parseInt(process.env.PORT, 10),
  },
  db: {
    DB_NAME: process.env.MONGO_DB_NAME,
    COLLECTION_NAME: process.env.COLLECTION_NAME,
    DB_URL: 'mongodb://localhost:27017',
  },
};
