const home = require('./home');
const todos = require('./todos');

module.exports = (app) => {
  app.use('/', home);
  app.use('/', todos);
};
