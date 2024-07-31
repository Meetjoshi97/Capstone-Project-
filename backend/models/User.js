const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  phone: { type: String },
  country: { type: String },
  city: { type: String },
  zipCode: { type: String },
});


const User = mongoose.model('User', UserSchema);

module.exports = User;
