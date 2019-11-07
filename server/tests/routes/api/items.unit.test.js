const itemsRoute = require('../../../routes/api/items');
const Item = require('../../../database/models/Item');

jest.mock('../../../database/models/Item');

describe('Unit::/api/items', function() {
  describe('GET /', function() {
    it('returns all the items items', async function() {
      const response = {json: jest.fn()};
      const items = [{a: 'b', hoo: 'dinkle'}];
      Item.find.mockImplementationOnce(() => Promise.resolve(items));
      await itemsRoute.routes.getItems({}, response);
      expect(response.json).toHaveBeenCalled();
    });
  });
  describe('GET /:itemId', function() {
    it('returns the item found', async function() {
      const request = {params: {itemId: '12345'}};
      const response = {json: jest.fn()};
      const item = {dinkle: 'berry', id: request.params.itemId};
      Item.findById.mockImplementationOnce(() => Promise.resolve(item));
      await itemsRoute.routes.getItem(request, response);
      expect(response.json).toHaveBeenCalledWith(item);
    });
  });
  describe('POST /', function() {
    it('returns the created item', async function() {
      const request = {
        body: {name: 'product-name', description: 'mydescription'},
      };
      const response = {json: jest.fn()};
      const item = {...request.body, save: jest.fn(() => Promise.resolve())};
      Item.mockImplementationOnce(() => item);
      await itemsRoute.routes.postItem(request, response);
      expect(response.json).toHaveBeenCalledWith(item);
    });
  });
});
