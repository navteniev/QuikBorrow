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

router.post('/:transactionId/approve', transactionController.approve);

/**
 * @memberof module:api/transactions
 * @name POST /reject
 */

router.post('/:transactionId/reject', transactionController.reject);

/**
 * @memberof module:api/transactions
 * @name POST /getUserBorrowTransactions
 */

router.post('/getUserBorrowTransactions',
    transactionController.getUserBorrowTransactions);

/**
 * @memberof module:api/transactions
 * @name POST /getPendingTransactions
 */

router.post('/getUserPendingTransactions',
    transactionController.getUserPendingTransactions);

/**
 * @memberof module:api/transactions
 * @name POST /getTransactionRequests
 */

router.post('/getTransactionRequests',
    transactionController.getTransactionRequests);

module.exports = router;
