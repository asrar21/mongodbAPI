const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderSchema = new mongoose.Schema({
  
  orderBy: {
    type: Schema.Types.ObjectId,
 },
 
 orders: [{

  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    },
  productid: {
    type: Schema.Types.ObjectId,
  },
  quantity: {
    type: String,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
 },

}],
 date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('order', OrderSchema);