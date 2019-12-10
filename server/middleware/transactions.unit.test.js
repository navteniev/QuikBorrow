const transactionsMiddleware = require('./transactions');
const userServices = require('../services/users');

jest.mock('../services/users');

describe('Unit::middleware/transactions', function() {
  describe('hasNoPendingTransaction', function() {
    it('returns true if has no pending transaction', function() {
      const data = {
        req: {body: {}},
      };
      userServices.hasPendingTransaction.mockResolvedValueOnce(false);
      return expect(transactionsMiddleware.expressValidator
          .hasNoPendingTransaction('', data))
          .resolves
          .toEqual(true);
    });
    it('throws an error if has pending transaction', function() {
      const data = {
        req: {body: {}},
      };
      userServices.hasPendingTransaction.mockResolvedValueOnce(true);
      return expect(transactionsMiddleware.expressValidator
          .hasNoPendingTransaction('', data))
          .rejects
          .toThrowError(new Error('Pending transaction exists'));
    });
  });
});
