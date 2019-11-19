const Item = require('../models/Item');

const createItem = async (data) => {
  const item = new Item(data);
  await item.save();
  return item;
};

const findItem = async (id) => {
  return await Item.findById(id);
};

const findAllItems = async () => {
  return await Item.find({});
};

const searchItems = async (query) => {
  return await Item.find({name: {$regex: query, $options: 'i'}});
};

const rentItem = async (id, borrowerId, duration) => {
  const item = await Item.findById(id);
  const updated = await item.rentTo(borrowerId, duration);
  return updated;
};

const endRent = async (id) => {
  const item = await Item.findById(id);
  const updated = await item.endRent();
  return updated;
};

module.exports = {
  createItem,
  findItem,
  findAllItems,
  searchItems,
  rentItem,
  endRent,
};
