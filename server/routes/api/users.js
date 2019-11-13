/** @module api/users */

const express = require('express');
const router = new express.Router();
const userController = require('../../controllers/users');
const userMiddleware = require('../../middleware/users');
const validationErrors = require('../../middleware/shared/validatorErrors');
const {check, param} = require('express-validator');

/**
 * Register user
 * @memberof module:api/users
 * @name POST /register
 */
router.post('/register', [
  check('name', 'Username field required')
      .isLength({min: 1}),
  check('email', 'Invalid email')
      .isLength({min: 1}).withMessage('Email field required')
      .bail()
      .isEmail().withMessage('Not an email')
      .bail()
      .custom(userMiddleware.expressValidator.emailShouldExist(false)),
  check('password')
      .isLength({min: 6}).withMessage('Password must be >6 characters')
      .custom(userMiddleware.expressValidator.matches),
  validationErrors,
], userController.register);

/**
 * Login user and return JWT token
 * @memberof module:api/users
 * @name POST /login
 */
router.post('/login', [
  check('email')
      .isLength({min: 1}).withMessage('Email field required')
      .bail()
      .isEmail().withMessage('Not an email')
      .bail()
      .custom(userMiddleware.expressValidator.emailShouldExist(true)),
  check('password')
      .custom(userMiddleware.expressValidator.passwordMatchesHash),
  validationErrors,
], userController.login);

//
router.get('/:userId', [
  param('userId', 'Invalid UserId')
      .isAlphanumeric(),
  validationErrors,
], userController.get);


router.patch('/:userId', [
  param('userId', 'Invalid userID')
      .isAlphanumeric(),
  validationErrors,
], userController.edit);
/**
 *  @memberof module:api/users
 * @name GET /:userId/items
 */
router.get('/:userId/items', [
  param('userId', 'invalid UserId').isAlphanumeric(),
  validationErrors,
], userController.getLendingList);


module.exports = router;
