const mongoose = require('mongoose');
const keys = require('../config/keys');
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  dbName: 'QuikBorrow',
};

/**
 * @typedef {import('express').Express} ExpressApplication
 */

/**
 * @param {ExpressApplication} expressApp - The Express.js application
 */
module.exports = (expressApp) => {
  mongoose.connect(keys.mongoURI, options)
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });

  // get connection
  const db = mongoose.connection;
  db.on('error', (err) => {
    console.log('Database connection error', err);
  });

  db.once('open', () => expressApp.emit('ready'));
};
