/** @module api/transactions */

const express = require('express');
const router = new express.Router();
const transactionController = require('../../controllers/transactions');


/**
 * Create a transaction
 *
 * @memberof module:api/transactions
 * @name POST /
 */
router.post('/', transactionController.create);

/**
 * Approve a transaction
 *
 * @memberof module:api/transactions
 * @name POST /approve
 */
router.post('/approve', transactionController.approve);

/**
 * Reject a transaction
 *
 * @memberof module:api/transactions
 * @name POST /reject
 */
router.post('/reject', transactionController.reject);

module.exports = router;
