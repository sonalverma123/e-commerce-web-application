// product.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item', 
        required: true,
      },
      title: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      price: {
        type: String,
      },
      image: {
        type: String,
      },
    },
  ],
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
