const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSubCategory(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.main_category = !isEmpty(data.main_category) ? data.main_category : '';
  data.category = !isEmpty(data.category) ? data.category : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'name field is required';
  }
  
  if (Validator.isEmpty(data.main_category)) {
    errors.main_category = 'select the main category id';
  }
  if (Validator.isEmpty(data.category)) {
    errors.category = 'select the category id';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
