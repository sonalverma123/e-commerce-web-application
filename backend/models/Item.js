const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  information: {
    type: String,
    required: true,
  },
  images: [{ type: String }],
  feedbacks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Feedback',
    },
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    enum: ['men', 'women', 'shoes', 'bags', 'appliances'],
    required: true,
  },

  Date: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
