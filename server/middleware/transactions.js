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
};

module.exports = {
  expressValidator,
};
