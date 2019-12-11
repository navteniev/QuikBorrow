const userServices = require('../services/users');

/**
 * @typedef {import('express-validator').CustomValidator} ExpressValidator
 */

const expressValidator = {
  /** @type {ExpressValidator} */
  hasNoPendingTransaction: async (value, {req}) => {
    // The value is the item ID
    const {borrowerId} = req.body;
    const pending = await userServices.hasPendingTransaction(borrowerId, value);
    if (pending) {
      throw new Error('Pending transaction exists');
    }
    return true;
  },
  validUserType: (value, {req}) => {
    if (value !== 'borrower' && value !== 'lender') {
      throw new Error('User type must be "borrower" or "lender"');
    }
    return true;
  },
  /** @type {ExpressValidator} */
  validProcessedType: (value, {req}) => {
    if (value !== 'true' && value !== 'false') {
      throw new Error('Porcessed query must be "true" or "false"');
    }
    return true;
  },
};

module.exports = {
  expressValidator,
};
