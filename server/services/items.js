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

const rentItem = async (id, borrowerId, duration) => {
  const item = await Item.findById(id);
  item.availability = false;
  item.borrower = borrowerId;
  item.returnDate = new Date((new Date()).getTime() + Number(duration));
  await item.save();
  return item;
};

module.exports = {
  createItem,
  findItem,
  findAllItems,
  rentItem,
};
