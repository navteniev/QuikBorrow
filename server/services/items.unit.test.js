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
  describe('deleteItem', function() {
    afterEach(function() {
      Item.findByIdAndDelete.mockReset();
    });
    it('deletes the item', async function() {
      const id = 'we23r4';
      await itemServices.deleteItem(id);
      expect(Item.findByIdAndDelete).toHaveBeenCalledWith(id);
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
      const id = 'q23r5';
      Item.findById.mockResolvedValueOnce({rentTo: jest.fn()});
      await itemServices.rentItem(id);
      expect(Item.findById).toHaveBeenCalledWith(id);
    });
    it('returns the updated item', async function() {
      const item = new Item();
      const updatedItem = {a: 1, b: 2};
      item.rentTo = jest.fn(async () => updatedItem);
      Item.findById.mockResolvedValueOnce(item);
      const returned = await itemServices.rentItem();
      expect(item.rentTo).toHaveBeenCalled();
      expect(returned).toEqual(updatedItem);
    });
  });
  describe('endRent', function() {
    it('finds the item by id', async function() {
      const id = 'qfgh23r5';
      Item.findById.mockResolvedValueOnce({endRent: jest.fn()});
      await itemServices.endRent(id);
      expect(Item.findById).toHaveBeenCalledWith(id);
    });
    it('returns the updated item', async function() {
      const item = new Item();
      const updatedItem = {a: 1, b: 2};
      item.endRent = jest.fn(async () => updatedItem);
      Item.findById.mockResolvedValueOnce(item);
      const returned = await itemServices.endRent();
      expect(item.endRent).toHaveBeenCalled();
      expect(returned).toEqual(updatedItem);
    });
  });
  describe('updateRating', function() {
    it('finds the item by id', async function() {
      const id = 'abc123';
      const ratingData = 4;
      Item.findOneAndUpdate.mockResolvedValueOnce({
        id,
        'rating': ratingData,
      });
      const returned = await itemServices.updateRating(id, ratingData);
      expect(returned).toEqual({id, 'rating': ratingData});
    });
  });
});
