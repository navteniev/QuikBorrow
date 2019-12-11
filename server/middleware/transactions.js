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
    if (value && value !== 'borrower' && value !== 'lender') {
      throw new Error('User type must be "borrower" or "lender" if it exists');
    }
    return true;
  },
  /** @type {ExpressValidator} */
  validProcessedType: (value, {req}) => {
    if (value && value !== 'true' && value !== 'false') {
      throw new Error('Processed query must be "true" or "false" if it exists');
    }
    return true;
  },
};

module.exports = {
  expressValidator,
};
