const itemMiddleware = require('./items');
const itemServices = require('../services/items');

jest.mock('../services/items');

describe('Unit::middleware/items', function() {
  describe('expressValidator', function() {
    describe('itemExistsAndAttach', function() {
      const {itemExistsAndAttach} = itemMiddleware.expressValidator;
      it(`throws an error if item doesn't exist`, function() {
        const error = new Error('Unknown item');
        itemServices.findItem.mockResolvedValueOnce();
        expect(itemExistsAndAttach('', {req: {}}))
            .rejects.toThrowError(error);
      });
      it('returns true if found', function() {
        itemServices.findItem.mockResolvedValueOnce({});
        return expect(itemExistsAndAttach('', {req: {}}))
            .resolves.toEqual(true);
      });
      it('attaches item document to request', async function() {
        const request = {};
        const item = {yo: 'mama so fat'};
        itemServices.findItem.mockResolvedValueOnce(item);
        await itemExistsAndAttach('', {req: request});
        expect(request.item).toEqual(item);
      });
    });
  });
});
