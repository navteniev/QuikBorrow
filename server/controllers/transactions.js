const transactionServices = require('../services/transactions');

const create  = async (req, res, next) => {
  const data = {
    borrower: req.body.borrowerId,
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
  transactionServices.approveTransaction(req.body.transactionId)
      .then((transaction) => {
        console.log(transaction);
        res.json(transaction);
      })
      .catch(next);
};

const reject = async (req, res, next) => {
  transactionServices.rejectTransaction(req.body.transactionId)
      .then((transaction) => {
        console.log(transaction);
        res.json(transaction);
      })
      .catch(next);
};

module.exports = {
  create,
  approve,
  reject,
};
