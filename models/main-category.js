const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MainCategorySchema = new Schema({
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
    default : true
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

module.exports = MainCategory = mongoose.model('main_category', MainCategorySchema);