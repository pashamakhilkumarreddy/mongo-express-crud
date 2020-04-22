const path = require('path');

module.exports = {
  index(req, res) {
    res.sendFile(path.join(process.cwd(), 'src/static/html/', 'index.html'));
  },
};
