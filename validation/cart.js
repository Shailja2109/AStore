const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCartInput(data) {
  let errors = {};

  data.item = !isEmpty(data.item) ? data.item : '';
  data.quantity = !isEmpty(data.quantity) ? data.quantity : '';
  data.size = !isEmpty(data.size) ? data.size : '';
  data.delivery_charge = !isEmpty(data.delivery_charge) ? data.delivery_charge : '';

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
