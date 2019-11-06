const express = require('express');
const router = new express.Router();
const items = require('./api/items');

router.use('/items', items.router);

module.exports = router;
