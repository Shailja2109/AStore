const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAddressInput(data) {
  let errors = {};

  data.delivery_address = !isEmpty(data.delivery_address) ? data.delivery_address : '';
  data.Home = !isEmpty(data.Home) ? data.Home : '';
  data.Street = !isEmpty(data.Street) ? data.Street : '';
  data.Landmark = !isEmpty(data.Landmark) ? data.Landmark : '';
  data.Pincode = !isEmpty(data.Pincode) ? data.Pincode : '';
  data.city = !isEmpty(data.city) ? data.city : '';
  data.state = !isEmpty(data.state) ? data.state : '';

  if (Validator.isEmpty(data.Home)) {
    errors.Home = 'home field is required';
  }

  if (Validator.isEmpty(data.Street)) {
    errors.Street = 'street field is required';
  }

  if (Validator.isEmpty(data.Landmark)) {
    errors.Landmark = 'landmark field is required';
  }

  if (Validator.isEmpty(data.Pincode)) {
    errors.Pincode = 'pincode field is required';
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
