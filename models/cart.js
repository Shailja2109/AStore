const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CartSchema = new Schema({
  user : {
    type: Schema.Types.ObjectID,
    ref: 'users',
    required: true
  },
  item: [{
    product : {
      type: Schema.Types.ObjectID,
      ref: 'products',
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    },
    size: {
      type: String,
      required: true
    }
  }],

  delivery_charge:{
    type: Number,
    required: true
  }
});

module.exports = Cart = mongoose.model('cart', CartSchema);