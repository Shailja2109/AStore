const User = require('../models/User');
const Profile = require('../models/profile');
const validateProfileInput = require('../validation/profile');
const validateAddressInput = require('../validation/address');
const profile = require('../models/profile');

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

    //for resulting whole user data
    const MasterProfile = {}

    //checking if user exists
    User.findById(req.user.id).then(user =>{
      if(user){
        //checking profile data exists
        Profile.findOne({ user: req.user.id })
        .then(profile => {
          if (profile) {
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

//Get all address
exports.getCustomerAddreess = (req,res)=>{
    const errors = {}
    profile.findOne({user:req.user.id})
    .then(profile=>{
        if(profile){
            res.json(profile.address);
        }
    })
}

//add customer address
exports.addAddress = (req,res)=>{
    //checking validation for address

    const {errors,isValid} = validateAddressInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    //address fields 
    const addressfield = {};
    if (req.body.full_name) addressfield.full_name = req.body.full_name;
    if (req.body.phone_number) addressfield.phone_number = req.body.phone_number;
    if (req.body.house_building) addressfield.house_building = req.body.house_building;
    if (req.body.area) addressfield.area = req.body.area;
    if (req.body.landmark) addressfield.landmark = req.body.landmark;
    if (req.body.city) addressfield.city = req.body.city;
    if (req.body.pincode) addressfield.pincode = req.body.pincode;
    
    if (req.body.state) addressfield.state = req.body.state;
    console.log(addressfield)
    //checking if user have profile
    profile.findOne({user:req.user.id})
    .exec((errors,profile) =>{
    
        if(errors) return res.status(400).json({errors});

        if(profile){
            const isUpdateAddress = profile.address.find(a=>a._id == req.body._id)
            let condition,action;
            if(isUpdateAddress){
                //update address
                condition = {user:req.user.id, "address._id" : req.body._id};
                action = {
                    "$set":{
                        "address.$":{
                            ...addressfield,
                            _id : req.body._id
                        }
                    }
                };
            }
            else{
                //adding new address
                condition = {user:req.user.id};
                action = {
                    "$push":{
                        "address" : addressfield
                    }
                };
            }
            //if profile found
            Profile.findOneAndUpdate(condition,action)
            .exec((err,_profile)=>{
                if(err) return res.status(400).json({err})
                if(_profile){
                    return res.status(200).json({profile : _profile})
                }
            });
        }
        else{
             //if profile not found, create new and add address

            const profile = new Profile({
                user : req.user.id,
                address : [addressfield]
            });

            // save profile with address
            profile.save((err,_profile)=>{
                if(err) return res.status(400).json({err});
                if(_profile){
                    return res.status(200).json(_profile);
                }
            })
           
        }
    });
}