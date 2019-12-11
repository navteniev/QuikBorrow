/**
 * @typedef {import('express-validator').CustomValidator} ExpressValidator
 */

const expressValidator = {
  /** @type {ExpressValidator} */
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
