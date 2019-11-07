const express = require('express');
const router = new express.Router();
const items = require('./items');
const users = require('./users');

router.use('/items', items.router);
router.use('/users', users);

module.exports = router;
