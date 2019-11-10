const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {type: String, default: ''},
  description: {type: String, default: ''},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  availability: {type: Boolean, default: false},
  image: {type: Buffer},
});

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;
