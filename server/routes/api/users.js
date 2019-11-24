/** @module api/users */

const express = require('express');
const router = new express.Router();
const userController = require('../../controllers/users');
const userMiddleware = require('../../middleware/users');
const itemMiddleware = require('../../middleware/items');
const validatorErrors = require('../../middleware/shared/validatorErrors');
const validObjectId = require('../../middleware/shared/validators/isObjectId');
const {check, param, header} = require('express-validator');

/**
 * Register user
 *
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
  validatorErrors,
], userController.register);

/**
 * Login user and return JWT token
 *
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
  validatorErrors,
], userController.login);

/**
 * Get a user
 *
 * @memberof module:api/users
 * @name GET /:userId
 */
router.get('/:userId', [
  param('userId', 'Invalid UserId')
      .custom(validObjectId),
  validatorErrors,
], userController.get);

/**
 * Update a user
 *
 * @memberof module:api/users
 * @name PATCH /:userId
 */
router.patch('/:userId', [
  param('userId')
      .custom(validObjectId),
  validatorErrors,
], userController.edit);

/**
 * Get the items of a user
 *
 * @memberof module:api/users
 * @name GET /:userId/items
 */
router.get('/:userId/items', [
  param('userId')
      .custom(validObjectId),
  validatorErrors,
], userController.getLendingList);

/**
 * Create an item for a user
 *
 * @memberof module:api/users
 * @name POST /:userId/items
 */
router.post('/:userId/items', [
  param('userId')
      .custom(validObjectId),
  check('name')
      .isLength({min: 1}),
  check('description')
      .isLength({min: 1}),
  header('Authorization', 'Invalid Authorization header')
      .isLength({min: 1})
      .bail()
      .custom(userMiddleware.expressValidator.attachDecodedToken),
  validatorErrors,
], userController.createItem);

router.delete('/:userId/items/:itemId', [
  param('userId')
      .custom(validObjectId),
  param('itemId')
      .custom(validObjectId)
      .custom(itemMiddleware.expressValidator.itemExistsAndAttach),
  header('Authorization', 'Invalid Authorization header')
      .isLength({min: 1})
      .bail()
      .custom(userMiddleware.expressValidator.attachDecodedToken),
  validatorErrors,
  userMiddleware.userIsAuthorized,
  userMiddleware.userOwnsItem,
], userController.deleteItem);

module.exports = router;
