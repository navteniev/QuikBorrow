const Comment = require('../models/Comment');

/**
 * @typedef {import('mongoose').Document} MongooseDocument
 */

/**
 * @param {Object} data - Comment data
 * @returns {MongooseDocument} - Mongoose document
 */
const createComment = async (data) => {
  const comment = new Comment(data);
  console.log(comment);
  await comment.save();
  return comment;
};

/**
 * @param {string} id - Product ID
 * @returns {MongooseDocument} - Comments associated with the product
 */
const findComments = async (id) => {
  return await Comment.find({product: id});
};

module.exports = {
  createComment,
  findComments,
};
