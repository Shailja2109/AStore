const isEmpty = require('./is-empty');
const keys = require('../../config/keys');

module.exports = function checkAdminUser(data) {
    let errors = {};
    if(data.role !== keys.ADMIN){
        errors.userrole = 'Only admin user can access.'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}
