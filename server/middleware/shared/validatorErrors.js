const {validationResult} = require('express-validator');

/** @type {import('express').RequestHandler} */
module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }
  next();
};
