const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: {
    type: String,
  },
  id: {
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
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
});

module.exports = mongoose.model('Comment', CommentSchema);
