const express = require('express');
const router = new express.Router();
const {param} = require('express-validator');
const itemController = require('../../controllers/items');
const validatorErrors = require('../../middleware/shared/validatorErrors');

router.post('/', itemController.create);

router.get('/', itemController.getAll);

router.get('/:itemId', [
  param('itemId').isInt(),
  validatorErrors,
], itemController.get);

module.exports = router;
