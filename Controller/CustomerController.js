const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Profile = require('../models/profile');
const validateProfileInput = require('../validation/profile');

//Get customer profile
exports.getCutomerProfile = (req,res)=>{
    const errors = {}
    User.findById(req.user.id)
    .then(user =>{
        if(user){
            Profile.findOne({ user: req.user.id })
            .then(profile => {
            if (profile) {
                const MasterProfile = {};
                MasterProfile.user = user;
                MasterProfile.profile = profile;
                res.json(MasterProfile);
            }else{
                errors.Profile = 'register to view your profile';
                res.status(400).json(errors);
            }
            });
        }else{
            errors.Profile = 'sign up first to proceed further';
            res.status(400).json(errors);
        }
    });
}

// Update profile info for customer 
exports.CustomerProfile = (req,res) =>{

    //checking validation for profile and user data
    const {errors,isValid} = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const profileFields = {};
    const userFields = {}
    
    
    //user fields
    if (req.body.name) userFields.name = req.body.name;
    if (req.body.email) userFields.email = req.body.email;
    if (req.body.contact) userFields.contact = req.body.contact;

  
    //profile fields
    profileFields.user = req.user.id;
    if (req.body.gender) profileFields.gender = req.body.gender;
    if (req.body.age) profileFields.age = req.body.age;
    const MasterProfile = {}
    //checking if user exists
    User.findById(req.user.id).then(user =>{
      if(user){
        //checking profile data exists
        Profile.findOne({ user: req.user.id })
        .then(profile => {
          if (profile) {
            //for resulting whole user data
            
            //Updating user data
            User.findByIdAndUpdate(
              req.user.id,
              { $set : userFields},
              { new: true }
            ).then(user =>{
                if(user){
                    MasterProfile.user = user;
                }
                //updating profile data
                Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                ).then(profile=>{
                    if(profile){
                        MasterProfile.profile = profile;
                    }
                    res.json(MasterProfile)
                });
                
            });
  
            
            
          } else {
              errors.Profile = 'register to view your profile';
              res.status(400).json(errors);
          }
        }).catch(err => res.json(err));
      }
      else {
        errors.Profile = 'sign up first to proceed further';
        res.status(400).json(errors);
      }
    });
}