const itemsController = require('./items');
const itemServices = require('../services/items');

jest.mock('../services/items');

describe('controller/items', function() {
  describe('create', function() {
    it('returns the created item', async function() {
      const request = {body: {}};
      const response = {json: jest.fn()};
      const item = {foo: 'bar'};
      itemServices.createItem.mockResolvedValueOnce(item);
      await itemsController.create(request, response);
      expect(response.json).toHaveBeenCalledWith(item);
    });
  });
  describe('get', function() {
    it('returns the item', async function() {
      const request = {params: {itemId: '2qw3eit8ghj'}};
      const response = {json: jest.fn()};
      const item = {a: 'b'};
      itemServices.findItem.mockResolvedValueOnce(item);
      await itemsController.get(request, response);
      expect(response.json).toHaveBeenCalledWith(item);
    });
  });
  describe('getAll', function() {
    it('returns the items', async function() {
      const request = {params: {itemId: '2qw3eit8ghj1'}};
      const response = {json: jest.fn()};
      const items = [{a: 'ba'}];
      itemServices.findAllItems.mockResolvedValueOnce(items);
      await itemsController.getAll(request, response);
      expect(response.json).toHaveBeenCalledWith(items);
    });
  });
  describe('search', function() {
    it('searches for items', async function() {
      const request = {query: {param: 'chair'}};
      const response = {json: jest.fn()};
      const items = [{a: 'ba'}];
      itemServices.searchItems.mockResolvedValueOnce(items);
      await itemsController.search(request, response);
      expect(response.json).toHaveBeenCalledWith(items);
    });
  });
  describe('updateRating', function() {
    it('update rating for items', async function() {
      const request = {params: {itemId: '2qw3eit8ghj1', rating: 4}};
      const response = {json: jest.fn()};
      const item = {a: 'ba'};
      itemServices.updateRating.mockResolvedValueOnce(item);
      await itemsController.updateRating(request, response);
      expect(response.json).toHaveBeenCalledWith(item);
    });
  });
});
