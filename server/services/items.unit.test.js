const itemServices = require('./items');
const Item = require('../models/Item');

jest.mock('../models/Item');

describe('services/item', function() {
  afterEach(function() {
    Item.mockReset();
  });
  describe('createItem', function() {
    it('creates a new item with the data and saves it', async function() {
      const data = {a: 1, b: 2};
      await itemServices.createItem(data);
      expect(Item).toHaveBeenCalledWith(data);
      expect(Item.mock.instances[0].save).toHaveBeenCalled();
    });
    it('returns the created item', async function() {
      const data = {a: 1, b: 2};
      const returned = await itemServices.createItem(data);
      expect(Item).toHaveBeenCalledWith(data);
      expect(Item.mock.instances[0]).toEqual(returned);
    });
  });
  describe('findItem', function() {
    it('finds an item by id', async function() {
      const id = '12e';
      await itemServices.findItem(id);
      expect(Item.findById).toHaveBeenCalledWith(id);
    });
    it('returns the item found by id', async function() {
      const id = 'we234t';
      const item = {hugs: 'kisses'};
      Item.findById.mockResolvedValueOnce(item);
      const returned = await itemServices.findItem(id);
      expect(returned).toEqual(item);
    });
  });
  describe('findAllItems', function() {
    it('finds all items', async function() {
      await itemServices.findAllItems();
      expect(Item.find).toHaveBeenCalledWith({});
    });
    it('returns the items found', async function() {
      const items = [{hugs: 'kisses'}, {HAH: 'GOTEEEM'}];
      Item.find.mockResolvedValueOnce(items);
      const returned = await itemServices.findAllItems();
      expect(returned).toEqual(items);
    });
  });
  describe('rentItem', function() {
    it('finds the item by id', async function() {
      const id = '12e';
      Item.findById.mockResolvedValueOnce({save: jest.fn()});
      await itemServices.rentItem(id);
      expect(Item.findById).toHaveBeenCalledWith(id);
    });
    it('sets the availability to false', async function() {
      const item = {a: 1, boo: 2, save: jest.fn()};
      Item.findById.mockResolvedValueOnce(item);
      await itemServices.rentItem();
      expect(item.availability).toEqual(false);
    });
    it('calls save', async function() {
      const item = {a: 1, boo: 2, save: jest.fn()};
      Item.findById.mockResolvedValueOnce(item);
      await itemServices.rentItem();
      expect(item.save).toHaveBeenCalled();
    });
  });
});
