const userServices = require('../services/users');
const bcrypt = require('bcryptjs');

const expressValidator = {
  attachDecodedToken: async (value, {req}) => {
    const splitted = value.split(' ');
    if (splitted.length !== 2) {
      throw new Error('Malformed authorization header');
    }
    if (splitted[0].toLowerCase() !== 'bearer') {
      throw new Error('Incorrect authorization type (Must be Bearer)');
    }
    // This returns the same payload that userServices.getJwtToken accepts
    const decoded = await userServices.verifyJwtToken(splitted[1]);
    req.jwtDecoded = decoded;
    return true;
  },
  // eslint-disable-next-line valid-jsdoc
  /**
   * @param {boolean} shouldExist
   * @returns {import('express-validator').CustomValidator}
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
  // eslint-disable-next-line valid-jsdoc
  /** @type {import('express-validator').CustomValidator} */
  passwordMatchesHash: async (value, {req}) => {
    // req.user is attached in emailShouldExist middleware
    const matched = await bcrypt.compare(value, req.user.password);
    if (!matched) {
      throw new Error('Incorrect password');
    }
    return true;
  },
  // eslint-disable-next-line valid-jsdoc
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
