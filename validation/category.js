const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCategory(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.main_category = !isEmpty(data.main_category) ? data.main_category : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'name field is required';
  }
  
  if (Validator.isEmpty(data.main_category)) {
    errors.main_category = 'Please select main cateogry.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
