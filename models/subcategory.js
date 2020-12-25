const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SubCategory = new Schema({
  categoryId : {
    type: Schema.Types.ObjectID,
    ref: 'Category'
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
    type: Boolean,
    required: true
  },
  createdBy : {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = SubCategories = mongoose.model('SubCategory', SubCategory);