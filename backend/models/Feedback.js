const mongoose = require('mongoose');
const { Schema } = mongoose;

const FeedbackSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item', // Reference to the Product model
  },

  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;
