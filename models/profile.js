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
  address: [
    {
      full_name : {
        type:String,
        required :true
      },
      phone_number : {
        type : String,
        required : true
      },
      house_building: {
        type: String,
        required : true,
      },
      area: {
        type: String,
        required : true
      },
      landmark: {
        type: String
      },
      city: {
        type: String,
        required:true,
      },
      pincode: {
        type: String,
        required:true,
      },
      state: {
        type: String,
        required:true,
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
