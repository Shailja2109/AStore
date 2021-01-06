const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProduct(data){
    console.log(data)
    let errors = {};    

    data.name = !isEmpty(data.name) ? data.name : '';
    data.short_description = !isEmpty(data.short_description) ? data.short_description : '';
    data.price = !isEmpty(data.price) ? data.price : '';
    data.main_category = !isEmpty(data.main_category) ? data.main_category : '';
    data.category = !isEmpty(data.category) ? data.category : '';
    data.sub_category = !isEmpty(data.sub_category) ? data.sub_category : '';
    data.product_description = !isEmpty(data.product_description) ? data.product_description : '';
    data.brand = !isEmpty(data.brand) ? data.brand : '';
    data.sold_by = !isEmpty(data.sold_by) ? data.sold_by : '';
    data.thumbnail = !isEmpty(data.thumbnail) ? data.thumbnail : '';
    data.stock = !isEmpty(data.stock) ? data.stock : '';
   
    if (Validator.isEmpty(data.name)) {
        errors.name = 'name field is required';
    }

    if(!Validator.isLength(data.short_description,{min : 2, max : 30})){
        errors.short_description = 'short description need to be in between 2 to 30 charcaters.'
    }
    if (Validator.isEmpty(data.short_description)) {
        errors.short_description = 'short description field is required';
    }
    
    if (Validator.isEmpty(data.price)) {
        errors.price = 'price field is required';
    }

    if (Validator.isEmpty(data.main_category)) {
        errors.main_category = 'main category field is required';
    }
    if (Validator.isEmpty(data.category)) {
        errors.category = 'category field is required';
    }
    if (Validator.isEmpty(data.sub_category)) {
        errors.sub_category = 'sub category field is required';
    }
    if (Validator.isEmpty(data.product_description)) {
        errors.product_description = 'product description field is required';
    }
    if (Validator.isEmpty(data.brand)) {
        errors.brand = 'brand field is required';
    }
    if (Validator.isEmpty(data.sold_by )) {
        errors.sold_by = 'sold by field is required';
    }
    if (Validator.isEmpty(data.thumbnail)) {
        errors.thumbnail = 'thumbnail field is required';
    }

    if (Validator.isEmpty(data.stock)) {
        errors.stock = 'stock field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
}