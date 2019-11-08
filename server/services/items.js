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

module.exports = {
  createItem,
  findItem,
  findAllItems,
};
