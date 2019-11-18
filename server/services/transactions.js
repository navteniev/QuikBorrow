const Transaction = require('../models/Transaction');

const createTransaction = async (data) => {
  const transaction = new Transaction(data);
  await transaction.save();
  return transaction;
};

const approveTransaction = async (id) => {
  const transaction = await Transaction.findById(id);
  const updated = await transaction.approve();
  return updated;
};

const rejectTransaction = async (id) => {
  const transaction = await Transaction.findById(id);
  const updated = await transaction.reject();
  return updated;
};

const getUserBorrowTransactions = async (userId) => {
  const transactions = await Transaction.find({borrower: userId});
  return transactions;
};

const getUserPendingTransactions = async (userId) => {
  const transactions = await Transaction
      .find({borrower: userId, processed: false});
  return transactions;
};

const getTransactionRequests = async (userId) => {
  const requests = await Transaction
      .find({lender: userId, processed: false});
  return requests;
};

module.exports = {
  createTransaction,
  approveTransaction,
  rejectTransaction,
  getUserBorrowTransactions,
  getUserPendingTransactions,
  getTransactionRequests,
};

