const transactionsMiddleware = require('./transactions');
const userServices = require('../services/users');

jest.mock('../services/users');

describe('Unit://middleware/transactions', function() {
  describe('expressValidator', function() {
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
    describe('validUserType', function() {
      it('returns true for borrower', function() {
        const data = {req: {}};
        const func = transactionsMiddleware.expressValidator.validUserType;
        expect(func('borrower', data)).toEqual(true);
        expect(func('lender', data)).toEqual(true);
      });
      it('throws an error for non-borrower and non-lender', function() {
        const data = {req: {}};
        const func = transactionsMiddleware.expressValidator.validUserType;
        expect(() => func('aa', data)).toThrowError();
      });
    });
    describe('validProcessedType', function() {
      it('returns true for true or false value', function() {
        const data = {req: {}};
        const func = transactionsMiddleware.expressValidator.validProcessedType;
        expect(func('true', data)).toEqual(true);
        expect(func('false', data)).toEqual(true);
      });
      it('throws an error for non-borrower and non-lender', function() {
        const data = {req: {}};
        const func = transactionsMiddleware.expressValidator.validProcessedType;
        expect(() => func('aa', data)).toThrowError();
      });
    });
  });
});
