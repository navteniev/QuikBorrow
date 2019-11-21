const mongoose = require('mongoose');

/** @type {import('express-validator').CustomValidator} */
const isObjectId = async (value, {req}) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new Error('Malformed Object ID');
  }
  return true;
};

module.exports = isObjectId;
