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
 * Search for items
 *
 * @memberof module:api/items
 * @name GET /search
 */
router.get('/search', itemController.search);

/**
 * @memberof module:api/items
 * @name GET /:itemId
 */
router.get('/:itemId', [
  param('itemId').custom(isObjectId),
  validatorErrors,
], itemController.get);

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
 * Updates rating of an item
 *
 * @memberof module:api/items
 * @name GET /:itemId/updateRating/:rating/
 */
router.get('/:itemId/updateRating/:rating/', [
  param('itemId').isAlphanumeric(),
  validatorErrors,
], itemController.updateRating);

module.exports = router;
