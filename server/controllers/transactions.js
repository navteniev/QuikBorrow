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

const getTransactions = async (req, res, next) => {
  transactionServices.getTransactions(req.body.userId,
      req.query.type, req.query.isProcessed)
      .then((transactionList) => {
        console.log(transactionList);
        res.json(transactionList);
      })
      .catch(next);
};

module.exports = {
  create,
  approve,
  reject,
  getTransactions,
};
