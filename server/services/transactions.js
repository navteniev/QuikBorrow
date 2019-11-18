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

module.exports = {
  createTransaction,
  approveTransaction,
  rejectTransaction,
};

