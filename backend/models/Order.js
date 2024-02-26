const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
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
  billingAddress: {

    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    mobileNumber: { type: String },
    addressLine1: { type: String },
    addressLine2: { type: String },
    country: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paypalId: {
    type: String,
  },
  upiId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;

