const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.gender = !isEmpty(data.gender) ? data.gender : '';
  data.age = !isEmpty(data.age) ? data.age : '';
<<<<<<< HEAD

  // if (Validator.isEmpty(data.gender)) {
  //   errors.gender = 'gender field is required';
  // }

  // if (Validator.isEmpty(data.age)) {
  //   errors.age = 'age field is required';
  // }
=======
  data.delivery_address = !isEmpty(data.delivery_address) ? data.delivery_address : '';
>>>>>>> admin

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
