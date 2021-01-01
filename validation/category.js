const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCategory(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'name field is required';
  }
  
  if (Validator.isEmpty(data.main_category)) {
    errors.mainCategoryId = 'Please select main cateogry.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
