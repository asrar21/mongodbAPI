const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    },
  productId: {
    type: Schema.Types.ObjectId,
  },
  quantity: {
    type: String,
  },
  orderBy: {
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

module.exports = mongoose.model('order', OrderSchema);