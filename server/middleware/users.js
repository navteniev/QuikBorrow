const userServices = require('../services/users');
const bcrypt = require('bcryptjs');

/**
 * @typedef {import('express-validator').CustomValidator} ExpressValidator
 */

/**
 * @typedef {import('express').RequestHandler} ExpressHandler
 */

const expressValidator = {
  /** @type {ExpressValidator} */
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
  /**
   * @param {boolean} shouldExist - Whether the validation should assert
   *     if the email exists, or if it does not exist
   * @returns {ExpressValidator} - The express-validator function
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
  /** @type {ExpressValidator} */
  passwordMatchesHash: async (value, {req}) => {
    // req.user is attached in emailShouldExist middleware
    const matched = await bcrypt.compare(value, req.user.password);
    if (!matched) {
      throw new Error('Incorrect password');
    }
    return true;
  },
  /** @type {ExpressValidator} */
  matches: (value, {req}) => {
    if (value !== req.body.password2) {
      throw new Error('Passwords don\'t match');
    }
    return true;
  },
};

/** @type {ExpressHandler} */
const userIsAuthorized = async (req, res, next) => {
  if (req.jwtDecoded.id !== req.params.userId) {
    res.status(401).json({
      errors: [{msg: 'Unauthorized (non-matching IDs)'}],
    });
  }
};

/** @type {ExpressHandler} */
const userOwnsItem = async (req, res, next) => {
  if (req.jwtDecoded.id !== req.item.get('user', String)) {
    res.status(401).json({
      errors: [{msg: 'Unauthorized (does not own item)'}],
    });
  }
};

module.exports = {
  expressValidator,
  userIsAuthorized,
  userOwnsItem,
};
