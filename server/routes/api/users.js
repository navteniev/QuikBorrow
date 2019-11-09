/** @module api/users */

const express = require('express');
const router = new express.Router();
const userController = require('../../controllers/users');
const userMiddleware = require('../../middleware/users');
const validationErrors = require('../../middleware/shared/validatorErrors');
const {check} = require('express-validator');

/**
 * Register user
 * @memberof module:api/users
 * @name POST /register
 */
router.post('/register', [
  check('name', 'Username field required')
      .exists(),
  check('email', 'Invalid email')
      .exists()
      .bail()
      .isEmail()
      .bail()
      .custom(userMiddleware.expressValidator.emailShouldExist(false)),
  check('password', 'Password must be >6 chars')
      .isLength({min: 6})
      .bail()
      .custom(userMiddleware.expressValidator.matches),
  validationErrors,
], userController.register);

/**
 * Login user and return JWT token
 * @memberof module:api/users
 * @name POST /login
 */
router.post('/login', [
  check('email', 'Invalid email')
      .exists()
      .bail()
      .isEmail()
      .bail()
      .custom(userMiddleware.expressValidator.emailShouldExist(true)),
  check('password')
      .custom(userMiddleware.expressValidator.passwordMatchesHash),
  validationErrors,
], userController.login);

module.exports = router;
