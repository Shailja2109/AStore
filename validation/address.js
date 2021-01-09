const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAddressInput(data) {
  let errors = {};
  data.full_name = !isEmpty(data.full_name) ? data.full_name : '';
  data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : '';
  data.house_building = !isEmpty(data.house_building) ? data.house_building : '';
  data.area = !isEmpty(data.area) ? data.area : '';
  data.pincode = !isEmpty(data.pincode) ? data.pincode : '';
  data.city = !isEmpty(data.city) ? data.city : '';
  data.state = !isEmpty(data.state) ? data.state : '';

  if (Validator.isEmpty(data.full_name)) {
    errors.full_name = 'full name field is required';
  }

  if (!Validator.isLength(data.phone_number, {min : 10, max : 10})) {
    errors.phone_number = 'phone number should be only of 10 digits';
  }
  if (Validator.isEmpty(data.phone_number)) {
    errors.phone_number = 'phone number field is required';
  }

  if (Validator.isEmpty(data.house_building)) {
    errors.house_building = 'house or building field is required';
  }

  if (Validator.isEmpty(data.area)) {
    errors.area = 'area field is required';
  }
  if (!Validator.isLength(data.pincode, {min : 6, max : 6})) {
    errors.pincode = 'Pincode should be only of 6 digits';
  }
  if (Validator.isEmpty(data.pincode)) {
    errors.pincode = 'pincode field is required';
  }
  
  if (Validator.isEmpty(data.city)) {
    errors.city = 'city field is required';
  }

  if (Validator.isEmpty(data.state)) {
    errors.state = 'state field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
