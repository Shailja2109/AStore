const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Category = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  thumbnail : {
    type: String
  },
  isActive : {
    type: Boolean,
    // required: true
  },
  createdBy : {
    type: String,
    // required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Categories = mongoose.model('Category', Category);