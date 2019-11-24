const transactionServices = require('./transactions');
const Transaction = require('../models/Transaction');

jest.mock('../models/Transaction');

describe('services/item', function() {
  afterEach(function() {
    Transaction.mockReset();
  });
  describe('createTransaction', function() {
    it('creates a new transaction with the data and saves it',
        async function() {
          const data = {a: 1, b: 2};
          await transactionServices.createTransaction(data);
          expect(Transaction).toHaveBeenCalledWith(data);
          expect(Transaction.mock.instances[0].save).toHaveBeenCalled();
        },
    );
    it('returns the created transaction', async function() {
      const data = {a: 1, b: 2};
      const returned = await transactionServices.createTransaction(data);
      expect(Transaction).toHaveBeenCalledWith(data);
      expect(Transaction.mock.instances[0]).toEqual(returned);
    });
  });
  describe('approveTransaction', function() {
    it('approves a transaction by id', async function() {
      const id = 'abc123';
      Transaction.findById.mockResolvedValueOnce({approve: jest.fn()});
      await transactionServices.approveTransaction(id);
      expect(Transaction.findById).toHaveBeenCalledWith(id);
    });
    it('returns the transaction found by id', async function() {
      const transaction = new Transaction();
      const updatedTransaction = {a: 1, b: 2};
      transaction.approve = jest.fn(async () => updatedTransaction);
      Transaction.findById.mockResolvedValueOnce(transaction);
      const returned = await transactionServices.approveTransaction();
      expect(transaction.approve).toHaveBeenCalled();
      expect(returned).toEqual(updatedTransaction);
    });
  });
  describe('rejectTransaction', function() {
    it('rejects a transaction by id', async function() {
      const id = 'abc123';
      Transaction.findById.mockResolvedValueOnce({reject: jest.fn()});
      await transactionServices.rejectTransaction(id);
      expect(Transaction.findById).toHaveBeenCalledWith(id);
    });
    it('returns the transaction found by id', async function() {
      const transaction = new Transaction();
      const updatedTransaction = {a: 1, b: 2};
      transaction.reject = jest.fn(async () => updatedTransaction);
      Transaction.findById.mockResolvedValueOnce(transaction);
      const returned = await transactionServices.rejectTransaction();
      expect(transaction.reject).toHaveBeenCalled();
      expect(returned).toEqual(updatedTransaction);
    });
  });
  describe('getTransactions', function() {
    it('get transactions by query params', async function() {
      Transaction.findById.mockResolvedValueOnce({'userId': 'xyz'});
      const userId = 'abc123';
      const type = 'borrower';
      const isProcessed = false;
      await transactionServices.getTransactions(userId, type, isProcessed);
      expect(Transaction.find).toHaveBeenCalledWith(
          {'borrower': userId, 'processed': isProcessed});
    });
    it('returns transactions found by the params', async function() {
      const transaction = new Transaction();
      const transactions = {transaction, transaction};
      Transaction.find.mockResolvedValueOnce(transactions);
      const returned = await transactionServices.getTransactions();
      expect(returned).toEqual(transactions);
    });
  });
});
