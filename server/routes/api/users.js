const express = require('express');
const router = new express.Router();
const validatorErrors = require('../../middleware/shared/validatorErrors');
const userMiddleware = require('../../middleware/users');
const userController = require('../../controllers/users');
const {check} = require('express-validator');

// @route POST api/users/register
// @desc Register user
// @access Public
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
  validatorErrors,
], userController.register);

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', [
  check('email', 'Invalid email')
      .exists()
      .bail()
      .isEmail()
      .bail()
      .custom(userMiddleware.expressValidator.emailShouldExist(true)),
  check('password')
      .custom(userMiddleware.expressValidator.passwordMatchesHash),
  validatorErrors,
], userController.login);

module.exports = router;
