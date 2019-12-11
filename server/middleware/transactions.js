/**
 * @typedef {import('express-validator').CustomValidator} ExpressValidator
 */

const expressValidator = {
  /** @type {ExpressValidator} */
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
