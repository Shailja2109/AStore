const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCategory(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.thumbnail = !isEmpty(data.thumbnail) ? data.thumbnail : '';
  data.createdBy = !isEmpty(data.createdBy) ? data.createdBy : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'name field is required';
  }

  if (Validator.isEmpty(data.thumbnail)) {
    errors.thumbnail = 'thumbnail field is required';
  }

  if (Validator.isEmpty(data.createdBy)) {
    errors.createdBy = 'createdBy field is required';
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
