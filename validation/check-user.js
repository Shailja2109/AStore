const isEmpty = require('./is-empty');
const keys = require('../config/keys');

module.exports = function checkAdminUser(data) {
    let accessErrors = {};
    if(data.role !== keys.ADMIN){
        accessErrors.userrole = 'Only admin user can access.'
    }
    
    return {
        accessErrors,
        accessIsValid: isEmpty(accessErrors)
    };
}
