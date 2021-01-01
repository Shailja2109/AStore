const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCategory(data) {
  let subCategoryError = {};

  data.name = !isEmpty(data.name) ? data.name : '';

  if (Validator.isEmpty(data.name)) {
    subCategoryError.name = 'name field is required';
  }
  
  if (Validator.isEmpty(data.categoryId)) {
    subCategoryError.categoryId = 'select the main category id';
  }

  return {
    subCategoryError,
    subCategoryIsValid: isEmpty(subCategoryError)
  };
};
