const Transaction = require('../models/Transaction');
const itemServices = require('./items');
/**
 * @typedef {import('mongoose').Document} MongooseDocument
 */

/**
 * Create a new transation
 *
 * @param {Object} data - Transaction data
 * @returns {MongooseDocument} - The newly created Document
 */
const createTransaction = async (data) => {
  const transaction = new Transaction(data);
  await transaction.save();
  return transaction;
};

/**
 * Approves a transaction.
 * Updates all other transactions related
 * to this item to processed (cancels all other transactions).
 * Finishes the rent out process by setting the item fields.
 *
 * @param {string} id - The transaction ID
 * @returns {MongooseDocument} - The updated Document
 */
const approveTransaction = async (id) => {
  const transaction = await Transaction.findById(id);
  await Transaction.updateMany(
      {'item': transaction.item},
      {'$set': {'processed': true}},
  );
  const updated = await transaction.approve();
  await itemServices.rentItem(
      transaction.item,
      transaction.borrower,
      transaction.duration,
  );
  return updated;
};

/**
 * Reject a transaction
 *
 * @param {string} id - The transaction ID
 * @returns {MongooseDocument} - The updated Document
 */
const rejectTransaction = async (id) => {
  const transaction = await Transaction.findById(id);
  const updated = await transaction.reject();
  return updated;
};

/**
 * Gets Transactions based on
- userId
- type
- processed
 *
 * @param userId
 * @param type
 * @param isProcessed
 */
const getTransactions = async (userId, type, isProcessed) => {
  let query;
  if (type == 'borrower') {
    query = {borrower: userId};
  } else {
    query = {lender: userId};
  }
  query['processed'] = isProcessed;
  const transactions = await Transaction.find(query);
  return transactions;
};

module.exports = {
  createTransaction,
  approveTransaction,
  rejectTransaction,
  getTransactions,
};

