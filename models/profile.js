const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectID,
    ref: 'users'
  },
  gender: {
    type: String,
  },
  age: {
    type: String,
  },
  delivery_address: [
    {
      House: {
        type: String,
      },
      Street: {
        type: String,
      },
      Landmark: {
        type: String
      },
      city: {
        type: String,
      },
      Pincode: {
        type: String,
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
