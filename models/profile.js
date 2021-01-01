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
<<<<<<< HEAD
    type: Number,
=======
    type: String,
>>>>>>> admin
  },
  delivery_address: [
    {
      House: {
        type: String,
<<<<<<< HEAD
        // required: true
      },
      Street: {
        type: String,
        // required: true
=======
      },
      Street: {
        type: String,
>>>>>>> admin
      },
      Landmark: {
        type: String
      },
      city: {
        type: String,
<<<<<<< HEAD
        // required: true
      },
      Pincode: {
        type: String,
        // required: true
=======
      },
      Pincode: {
        type: String,
>>>>>>> admin
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
