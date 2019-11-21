const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {type: String, default: ''},
  description: {type: String, default: ''},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  availability: {type: Boolean, default: false},
  image: {type: Buffer},
  borrower: {type: Schema.Types.ObjectId},
  returnDate: {type: Date, default: Date.now},
});

/**
 * @typedef {mongoose.Document} MongooseDocument
 */

/**
 * Rent an item to a borrower for a specified duration
 *
 * @param {mongoose.Types.ObjectId|string} borrowerId - The borrow's ObjectId
 * @param {number|string} duration - ms since January 1, 1970, 00:00:00 UTC
 * @returns {MongooseDocument} - The newly saved document
 */
async function rentTo(borrowerId, duration) {
  this.availability = false;
  this.borrower = new mongoose.Types.ObjectId(borrowerId);
  this.returnDate = new Date((new Date()).getTime() + Number(duration));
  await this.save();
  return this;
}

/**
 * Stop renting an item
 *
 * @returns {MongooseDocument} - The updated document
 */
async function endRent() {
  this.set({
    availability: true,
    borrower: undefined,
  });
  await this.save();
  return this;
}

ItemSchema.methods.rentTo = rentTo;
ItemSchema.methods.endRent = endRent;

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
