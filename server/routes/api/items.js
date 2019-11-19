/** @module api/items */

const express = require('express');
const router = new express.Router();
const {param} = require('express-validator');
const itemController = require('../../controllers/items');
const validatorErrors = require('../../middleware/shared/validatorErrors');
const isObjectId = require('../../middleware/shared/validators/isObjectId');

/**
 * @memberof module:api/items
 * @name POST /
 */
router.post('/', itemController.create);

/**
 * @memberof module:api/items
 * @name GET /
 */
router.get('/', itemController.getAll);

/**
 * @memberof module:api/items
 * @name GET /:itemId
 */
router.get('/:itemId', [
  param('itemId').custom(isObjectId),
  validatorErrors,
], itemController.get);

/**
 * @memberof module:api/items
 * @name GET /rent
 */
router.get('/:itemId/rent/:borrowerId/:duration', [
  param('itemId').custom(isObjectId),
  param('borrowerId').custom(isObjectId),
  param('duration').isInt(),
  validatorErrors,
], itemController.rent);

/**
 * @memberof module:api/items
 * @name GET /:itemId/endrent
 */
router.get('/:itemId/endrent', [
  param('itemId').isAlphanumeric(),
  validatorErrors,
], itemController.endRent);

/**
 * @memberof module:api/items
 * @name POST /search
 */
router.get('/search', itemController.search);

module.exports = router;
