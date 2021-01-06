const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.gender = !isEmpty(data.gender) ? data.gender : '';
  data.age = !isEmpty(data.age) ? data.age : '';
  data.delivery_address = !isEmpty(data.delivery_address) ? data.delivery_address : '';

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
