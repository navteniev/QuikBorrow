const itemsController = require('../../controllers/items');
const itemServices = require('../../services/items');

jest.mock('../../services/items');

describe('Unit::/api/items', function() {
  describe('GET /', function() {
    it('returns all the items items', async function() {
      const response = {json: jest.fn()};
      const items = [{a: 'b', hoo: 'dinkle'}];
      itemServices.findAllItems.mockResolvedValueOnce(items);
      await itemsController.getAll({}, response);
      expect(response.json).toHaveBeenCalledWith(items);
    });
  });
  describe('GET /:itemId', function() {
    it('returns the item found', async function() {
      const request = {params: {itemId: '12345'}};
      const response = {json: jest.fn()};
      const item = {dinkle: 'berry', id: request.params.itemId};
      itemServices.findItem.mockResolvedValueOnce(item);
      await itemsController.get(request, response);
      expect(response.json).toHaveBeenCalledWith(item);
    });
  });
  describe('POST /', function() {
    it('returns the created item', async function() {
      const item = {name: 'product-name', description: 'mydescription'};
      const request = {
        body: item,
      };
      const response = {json: jest.fn()};
      itemServices.createItem.mockResolvedValueOnce(request.body);
      await itemsController.create(request, response);
      expect(response.json).toHaveBeenCalledWith(item);
    });
  });
});
