const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    },
  quantity: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
 },
 createdBy: {
    type: Schema.Types.ObjectId,
 },
 date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('cart', CartSchema);