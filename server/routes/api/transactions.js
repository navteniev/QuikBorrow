/** @module api/transactions */

const express = require('express');
const router = new express.Router();
const {param} = require('express-validator');
const transactionController = require('../../controllers/transactions');
const validatorErrors = require('../../middleware/shared/validatorErrors');
const isObjectId = require('../../middleware/shared/validators/isObjectId');


/**
 * @memberof module:api/transactions
 * @name POST /
 */
router.post('/', transactionController.create);

/**
 * @memberof module:api/transactions
 * @name POST /approve
 */

router.post('/approve', transactionController.approve);

/**
 * @memberof module:api/transactions
 * @name POST /reject
 */

router.post('/reject', transactionController.reject);

module.exports = router;
