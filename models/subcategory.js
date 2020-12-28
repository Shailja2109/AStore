const mongoose = require('mongoose');
const { default: validator } = require('validator');
const Schema = mongoose.Schema;

// Create Schema
const SubCategory = new Schema({
  categoryId : {
    type: Schema.Types.ObjectID,
    ref: 'Category',
    required: true
  },
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
    type: Boolean
  },
  createdBy : {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = SubCategories = mongoose.model('SubCategory', SubCategory);