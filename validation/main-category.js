const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateMainCategory(data) {
  let errors = {};
  console.log("call ")
  data.name = !isEmpty(data.name) ? data.name : '';
  console.log(data.name)
  if (Validator.isEmpty(data.name)) {
    errors.name = 'name field is required';
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
