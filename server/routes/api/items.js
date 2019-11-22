/** @module api/items */

const express = require('express');
const router = new express.Router();
const {param} = require('express-validator');
const itemController = require('../../controllers/items');
const validatorErrors = require('../../middleware/shared/validatorErrors');
const isObjectId = require('../../middleware/shared/validators/isObjectId');

/**
 * Create a new item
 *
 * @memberof module:api/items
 * @name POST /
 */
router.post('/', itemController.create);

/**
 * Get all items
 *
 * @memberof module:api/items
 * @name GET /
 */
router.get('/', itemController.getAll);

/**
 * Get a specific item
 *
 * @memberof module:api/items
 * @name GET /:itemId
 */
router.get('/:itemId', [
  param('itemId').custom(isObjectId),
  validatorErrors,
], itemController.get);

/**
 * Rent an item from a specific borrower for a set duration
 *
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
 * Stop renting an item
 *
 * @memberof module:api/items
 * @name GET /:itemId/endrent
 */
router.get('/:itemId/endrent', [
  param('itemId').isAlphanumeric(),
  validatorErrors,
], itemController.endRent);

/**
 * Search for items
 *
 * @memberof module:api/items
 * @name GET /search
 */
router.get('/search', itemController.search);

module.exports = router;
