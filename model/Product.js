const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    
  },
  location: {
    type: String,
  },
  image: {
    type:  String,
 },
 createdBy: {
    type: Schema.Types.ObjectId,
 },
 date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('product', ProductSchema);