const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  borrower: {type: Schema.Types.ObjectId, ref: 'User'},
  lender: {type: Schema.Types.ObjectId, ref: 'User'},
  msg: {type: String, default: ''},
  item: {type: Schema.Types.ObjectId, ref: 'Item'},
  approved: {type: Boolean, default: false},
  processed: {type: Boolean, default: false},
});

/**
 * Approve the transaction request
 */
async function approve() {
  this.set({
    approved: true,
    processed: true,
  });
  await this.save();
  return this;
}

/**
 * Reject the transaction request
 */
async function reject() {
  this.set({
    approved: false,
    processed: true,
  });
  await this.save();
  return this;
}

TransactionSchema.methods.approve = approve;
TransactionSchema.methods.reject = reject;

const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;

