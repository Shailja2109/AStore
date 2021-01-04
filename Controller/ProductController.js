const product = require('../models/product');
const validateProduct = require('../validation/Product')

exports.addProduct = (req,res) =>{
    console.log(req.body)
    const {errors,isValid } = validateProduct(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const ProductFields = {}
    if(req.body.name) ProductFields.name = req.body.name;

    if(req.body.short_description) ProductFields.short_description = req.body.short_description;

    if(req.body.price) ProductFields.price = req.body.price;

    if(req.body.main_category) ProductFields.main_category = req.body.main_category;

    if(req.body.category) ProductFields.category = req.body.category;

    if(req.body.sub_category) ProductFields.sub_category = req.body.sub_category;

    if(req.body.product_description) ProductFields.product_description = req.body.product_description;

    if(req.body.brand) ProductFields.brand = req.body.brand;

    if(req.body.offer_price) ProductFields.offer_price = req.body.offer_price;

    if(req.body.discount) ProductFields.discount = req.body.discount;
    
    if(req.body.sold_by) ProductFields.sold_by = req.body.sold_by;

    if(req.body.thumbnail) ProductFields.thumbnail = req.body.thumbnail;

    if(req.body.stock) ProductFields.stock = req.body.stock;

    ProductFields.added_by = req.user.id;
    product.insertMany(new product(ProductFields)).then(product =>res.json(product)).catch(err => res.status(404).json(err));

}