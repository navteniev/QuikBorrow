const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectID,
    ref: 'User',
  },
  product: {
    type: Schema.Types.ObjectID,
    ref: 'Item',
  },
  text: {
    type: String,
    default: '',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Comment', CommentSchema);
