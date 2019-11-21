const userServices = require('../services/users');
const bcrypt = require('bcryptjs');

const expressValidator = {
  /**
   * @param {boolean} shouldExist - Whether the validation should assert
   *     if the email exists, or if it does not exist
   * @returns {import('express-validator').CustomValidator} - The
   *     express-validator function
   */
  emailShouldExist: (shouldExist) => async (value, {req}) => {
    const user = await userServices.findUserByEmail(value);
    if (shouldExist && !user) {
      throw new Error('Email not found');
    } else if (!shouldExist && user) {
      throw new Error('Email exists');
    }
    if (user) {
      req.user = user;
    }
    return true;
  },
  /** @type {import('express-validator').CustomValidator} */
  passwordMatchesHash: async (value, {req}) => {
    // req.user is attached in emailShouldExist middleware
    const matched = await bcrypt.compare(value, req.user.password);
    if (!matched) {
      throw new Error('Incorrect password');
    }
    return true;
  },
  /** @type {import('express-validator').CustomValidator} */
  matches: (value, {req}) => {
    if (value !== req.body.password2) {
      throw new Error('Passwords don\'t match');
    }
    return true;
  },
};

module.exports = {
  expressValidator,
};
