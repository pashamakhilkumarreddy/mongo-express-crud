require('dotenv').config();

console.log(process.env.PORT);

module.exports = {
  server: {
    PORT: parseInt(process.env.PORT, 10),
  },
  db: {
    DB_NAME: 'mongo_crud',
    DB_URL: 'mongodb://localhost:27017',
  },
};
