const express = require('express');
const router = new express.Router();
const items = require('./items');

router.use('/items', items);

module.exports = router;
