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

