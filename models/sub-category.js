const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const subCategorySchema = new Schema({
  main_category : {
    type: Schema.Types.ObjectID,
    ref: 'main_category',
    required: true
  },
  category : {
    type: Schema.Types.ObjectID,
    ref: 'category',
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
    type: Boolean,
    default : true
  },
  createdBy : {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = SubCategory = mongoose.model('sub_category', subCategorySchema);