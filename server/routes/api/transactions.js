/** @module api/transactions */

const express = require('express');
const router = new express.Router();
const transactionController = require('../../controllers/transactions');
const validatorErrors = require('../../middleware/shared/validatorErrors');
const {check, query} = require('express-validator');
const isObjectId = require('../../middleware/shared/validators/isObjectId');
const transactionMiddleware = require('../../middleware/transactions');

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
 * @name POST /:transactionId/approve
 */

router.post('/:transactionId/approve', transactionController.approve);

/**
 * Reject a transaction
 *
 * @memberof module:api/transactions
 * @name POST /reject
 */

router.post('/:transactionId/reject', transactionController.reject);

/**
 * @memberof module:api/transactions
 * @name POST /getTransactions
 */

router.post('/getTransactions', [
  check('userId')
      .custom(isObjectId),
  query('type')
      .custom(transactionMiddleware.expressValidator.validUserType),
  query('isProcessed')
      .custom(transactionMiddleware.expressValidator.validProcessedType),
  validatorErrors,
], transactionController.getTransactions);

module.exports = router;
