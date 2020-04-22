const router = require('express').Router();

const { home } = require('../controllers');

router.get('/', home.index);

module.exports = router;
