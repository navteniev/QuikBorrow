const Item = require('../models/Item');

/**
 * @typedef {import('mongoose').Document} MongooseDocument
 */

/**
 * @param {Object} data - Item data
 * @returns {MongooseDocument} - Mongoose document
 */
const createItem = async (data) => {
  const item = new Item(data);
  await item.save();
  return item;
};

/**
 * @param {string} id - Item ID
 */
const deleteItem = async (id) => {
  await Item.findByIdAndDelete(id);
};

/**
 * @param {string} id - Item ID
 * @returns {MongooseDocument} - The found item
 */
const findItem = async (id) => {
  return await Item.findById(id);
};

/**
 * @returns {MongooseDocument[]} - List of items
 */
const findAllItems = async () => {
  return await Item.find({});
};

/**
 * @param {string} query - Regex query
 * @returns {MongooseDocument[]} - Found items that match the regex
 */
const searchItems = async (query) => {
  return await Item.find({name: {$regex: query, $options: 'i'}});
};

/**
 * @param {string} id - Item ID
 * @param {string} borrowerId - Borrower ID
 * @param {number} duration - Duration to rent
 * @returns {MongooseDocument} - The updated document
 */
const rentItem = async (id, borrowerId, duration) => {
  const item = await Item.findById(id);
  const updated = await item.rentTo(borrowerId, duration);
  return updated;
};

/**
 * @param {string} id - Item ID
 * @returns {MongooseDocument} - The updated item
 */
const endRent = async (id) => {
  const item = await Item.findById(id);
  const updated = await item.endRent();
  return updated;
};

module.exports = {
  createItem,
  deleteItem,
  findItem,
  findAllItems,
  searchItems,
  rentItem,
  endRent,
};
