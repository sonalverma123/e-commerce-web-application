const mongoose = require('mongoose');
const { Schema } = mongoose;



const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
  
  },
  address: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
 
 

});

const User = mongoose.model('User', UserSchema);

module.exports = User;
