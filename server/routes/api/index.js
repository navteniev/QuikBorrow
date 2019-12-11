const express = require('express');
const router = new express.Router();
const items = require('./items');
const users = require('./users');
const transactions = require('./transactions');
const comments = require('./comments');

router.use('/items', items);

router.use('/users', users);

router.use('/transactions', transactions);

router.use('/comments', comments);

router.use('*', (req, res, next) => {
  res.status(404).json({errors: [{msg: 'Unknown API route'}]});
});

module.exports = router;
