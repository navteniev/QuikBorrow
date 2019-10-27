const express = require('express')
const router = express.Router();
const itemHandler = require('../handlers/itemHandler');

router.post('/create', itemHandler.createItem);
router.post('/retrieve', itemHandler.retrieveItem);
router.post('/retrieveall', itemHandler.retrieveItemList);

module.exports = router;
