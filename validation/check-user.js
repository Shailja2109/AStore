const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function checkAdminUser(data) {
    let errors = {};
    if(data.role !== 'admin'){
        errors.userrole = 'Only admin user can access.'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}
