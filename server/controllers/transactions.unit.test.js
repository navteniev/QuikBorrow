const transactionsController = require('./transactions');
const transactionServices = require('../services/transactions');

jest.mock('../services/transactions');

describe('controller/transactions', function() {
  describe('create', function() {
    it('returns the created transaction', async function() {
      const request = {body: {}};
      const response = {json: jest.fn()};
      const transaction = {msg: 'transaction'};
      transactionServices.createTransaction.mockResolvedValueOnce(transaction);
      await transactionsController.create(request, response);
      expect(response.json).toHaveBeenCalledWith(transaction);
    });
  });
  describe('approve', function() {
    it('approve the transaction', async function() {
      const request = {params: {transactionId: 'abcd1234'}};
      const response = {json: jest.fn()};
      const transaction = {msg: 'approved'};
      transactionServices.approveTransaction.mockResolvedValueOnce(transaction);
      await transactionsController.approve(request, response);
      expect(response.json).toHaveBeenCalledWith(transaction);
    });
  });
  describe('reject', function() {
    it('reject the transaction', async function() {
      const request = {params: {transactionId: 'abcd1234'}};
      const response = {json: jest.fn()};
      const transaction = {msg: 'rejected'};
      transactionServices.rejectTransaction.mockResolvedValueOnce(transaction);
      await transactionsController.reject(request, response);
      expect(response.json).toHaveBeenCalledWith(transaction);
    });
  });
  describe('getTransactions', function() {
    it('gets the transaction list', async function() {
      const request = {body: {userId: 'abcd1234'},
        query: {type: 'borrower', isProcessed: false}};
      const response = {json: jest.fn()};
      const transList = {
        'transaction1': {msg: 'transaction'},
        'transaction2': {'msg': 'transaction2'},
      };
      transactionServices.getTransactions.mockResolvedValueOnce(transList);
      await transactionsController.getTransactions(request, response);
      expect(response.json).toHaveBeenCalledWith(transList);
    });
  });
});

