/** @module api/transactions */

const express = require('express');
const router = new express.Router();
const transactionController = require('../../controllers/transactions');


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
