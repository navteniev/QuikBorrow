/** @module api/comment */

const express = require('express');
const router = new express.Router();
const {param} = require('express-validator');
const commentController = require('../../controllers/comments');
const isObjectId = require('../../middleware/shared/validators/isObjectId');

/**
 * Create a new comment
 *
 * @memberof module:api/comments
 * @name POST /
 */
router.post('/', commentController.create);

/**
 * Get comments of a specific product
 *
 * @memberof module:api/comments
 * @name GET /
 */
router.get('/:productId',
    [param('productId').custom(isObjectId)],
    commentController.getComments);

module.exports = router;
