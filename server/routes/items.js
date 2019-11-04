const express = require('express');
const router = new express.Router();
const itemHandler = require('../handlers/itemHandler');

router.post('/create', itemHandler.createItem);
router.get('/retrieve', itemHandler.retrieveItem);
router.get('/retrieveall', itemHandler.retrieveItemList);

module.exports = router;
