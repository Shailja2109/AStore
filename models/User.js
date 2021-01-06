const mongoose = require('mongoose');
const keys = require('../config/keys');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  contact: {
    required: true,
    type: String,
  },
  
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  role:{
    type: String,
    enum : [keys.USER,keys.ADMIN],
    default : keys.USER
  }
});

module.exports = User = mongoose.model('users', UserSchema);