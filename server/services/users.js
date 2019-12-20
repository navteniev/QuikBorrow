const bcrypt = require('bcryptjs');
const keys = require('../config/keys');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mongoose = require('mongoose');
const Item = require('../models/Item');
const transactionServices = require('./transactions');
const JWT_OPTIONS = {
  expiresIn: 31556926,
};

/**
 * Create a token from a payload that can then be decoded
 * later back into the payload
 *
 * @param {Object} payload - Data to store within the token
 * @returns {Promise<string>} - The JWT token
 */
const getJwtToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, keys.secretOrKey, JWT_OPTIONS, (err, token) => {
      return err ? reject(err) : resolve(token);
    });
  });
};

/**
 * Verify and decode a JWT token back to its original
 * object.
 *
 * @param {string} token - The JWT token
 * @returns {Promise<Object>} - The decoded object
 */
const verifyJwtToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, keys.secretOrKey, (err, decoded) => {
      return err ? reject(err) : resolve(decoded);
    });
  });
};

/**
 * Find a user by email
 *
 * @param {string} email - User email
 * @returns {mongoose.Document} - The found Document
 */
const findUserByEmail = (email) => {
  return User.findOne({email});
};

/**
 * @param {string} id - User ID
 * @returns {mongoose.Document} - The found Document
 */
const findUser = async (id) => {
  return await User.findById(id);
};

/**
 * Edit a user's details
 *
 * @param {string} id - User ID
 * @param {Object} updated - Updated values
 * @returns {mongoose.Document} - The found Document
 */
const editUser = async (id, updated) =>{
  return await User.findByIdAndUpdate(id, updated, {new: true});
};

/**
 * Creates a new User
 *
 * @param {Object} data - User data
 * @returns {mongoose.Document} - The newly created Document
 */
const createUser = async (data) => {
  const newUser = new User({
    name: data.name,
    email: data.email,
    password: data.password,
  });
  await newUser.save();
  return newUser;
};

/**
 * Generate a hash with bcrypt
 *
 * @param {string} value - Input string
 * @returns {string} - The hash value
 */
const generateHash = async (value) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(value, salt);
  return hash;
};

/**
 * Get a list of items that a user owns (lending out)
 *
 * @param {string} userId - User ID
 * @returns {mongoose.Document[]} - Array of Documents
 */
const getLendingList = async (userId) => {
  const casted = new mongoose.Types.ObjectId(userId);
  const lendingList = await Item.find({'user': casted});
  return lendingList;
};

/**
 * Check if a user has a pending transaction for a particular item
 *
 * @param {string} userId - The user's ID
 * @param {string} itemId - The item ID
 * @returns {boolean} - Whether there are pending transactions
 */
async function hasPendingTransaction(userId, itemId) {
  const allItems = await transactionServices
      .getTransactions(userId, 'borrower', false);
  const unprocessedItems = allItems
      .filter((transaction) => {
        return transaction.item.equals(itemId) && !transaction.processed;
      });
  return unprocessedItems.length > 0;
}

module.exports = {
  getJwtToken,
  createUser,
  generateHash,
  findUserByEmail,
  findUser,
  editUser,
  getLendingList,
  verifyJwtToken,
  hasPendingTransaction,
};
