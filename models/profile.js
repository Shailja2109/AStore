const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  delivery_address: [
    {
      House: {
        type: String,
        // required: true
      },
      Street: {
        type: String,
        // required: true
      },
      Landmark: {
        type: String
      },
      city: {
        type: String,
        // required: true
      },
      Pincode: {
        type: String,
        // required: true
      },
      state: {
        type: String,
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
