const transactionServices = require('../services/transactions');

const create = async (req, res, next) => {
  const data = {
    borrower: req.body.borrowerId,
    lender: req.body.lenderId,
    msg: req.body.msg,
    item: req.body.itemId,
  };
  transactionServices.createTransaction(data)
      .then((transaction) => {
        console.log('Successfully created transaction request.');
        res.json(transaction);
      })
      .catch(next);
};

const approve = async (req, res, next) => {
  transactionServices.approveTransaction(req.params.transactionId)
      .then((transaction) => {
        console.log(transaction);
        res.json(transaction);
      })
      .catch(next);
};

const reject = async (req, res, next) => {
  transactionServices.rejectTransaction(req.params.transactionId)
      .then((transaction) => {
        console.log(transaction);
        res.json(transaction);
      })
      .catch(next);
};

const getUserBorrowTransactions = async (req, res, next) => {
  transactionServices.getUserBorrowTransactions(req.body.userId)
      .then((transactionList) => {
        console.log(transactionList);
        res.json(transactionList);
      })
      .catch(next);
};

const getUserPendingTransactions = async (req, res, next) => {
  transactionServices.getUserPendingTransactions(req.body.userId)
      .then((pendingList) => {
        console.log(pendingList);
        res.json(pendingList);
      })
      .catch(next);
};

const getTransactionRequests = async (req, res, next) => {
  transactionServices.getTransactionRequests(req.body.userId)
      .then((requests) => {
        console.log(requests);
        res.json(requests);
      })
      .catch(next);
};

module.exports = {
  create,
  approve,
  reject,
  getUserBorrowTransactions,
  getUserPendingTransactions,
  getTransactionRequests,
};
