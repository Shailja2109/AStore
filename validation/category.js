const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCategory(data) {
  let categoryError = {};

  data.name = !isEmpty(data.name) ? data.name : '';

  if (Validator.isEmpty(data.name)) {
    categoryError.name = 'name field is required';
  }
  
  return {
    categoryError,
    categoryIsValid: isEmpty(categoryError)
  };
};
