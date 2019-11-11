const express = require('express');
const router = new express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const {check, param, validationResult} = require('express-validator');
const validatorErrors = require('../../middleware/shared/validatorErrors');

// Load User model
const User = require('../../models/User');
const userController = require('../../controllers/users');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', [
  check('name', 'Username field required')
      .isLength({min: 1}),
  check('email', 'Invalid email')
      .isLength({min: 1})
      .isEmail(),
  check('password', 'Invalid password')
      .isLength({min: 6})
      .custom((value, {req, loc, path}) => {
        if (value !== req.body.password2) {
          throw new Error('Passwords don\'t match');
        }
        return value;
      }),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }
  User.findOne({email: req.body.email}).then((user) => {
    if (user) {
      return res.status(400).json({email: 'Email already exists'});
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
      });
    });
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', [
  check('email', 'Invalid email')
      .isLength({min: 1})
      .isEmail(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({email}).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({emailnotfound: 'Email not found'});
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({passwordincorrect: 'Password incorrect'});
      }
      // User matched
      // Create JWT Payload
      const payload = {
        id: user.id,
        name: user.name,
      };

      const options = {
        expiresIn: 31556926,
      };

      // Sign token, expires in 1 year
      jwt.sign(payload, keys.secretOrKey, options, (err, token) => {
        res.json({
          success: true,
          token: 'Bearer ' + token,
        });
      });
    });
  });
});

//
router.get('/:userId', [
  param('userId', 'Invalid UserId')
      .isAlphanumeric(),
  validatorErrors,
], userController.get);


router.patch('/:userId', [
  param('userId', 'Invalid userID')
      .isAlphanumeric(),
  validatorErrors,
], userController.edit);

module.exports = router;
