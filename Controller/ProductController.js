const product = require("../models/product");
const validateProduct = require("../validation/Product");
const checkAdminUser = require("../validation/check-user");

function sortAndLimit(req) {
  const sort = {};
  if (req.query.sortBy && req.query.OrderBy) {
    sort[req.query.sortBy] = req.query.OrderBy === "desc" ? -1 : 1;
  }
  const match = {};
  if (req.query.name) {
    match.name = req.query.name;
  }
  return sort;
}

//admin accress control
exports.adminAccess = (req, res, next) => {
  const { accessErrors, accessIsValid } = checkAdminUser(req.user);
  if (!accessIsValid) {
    return res.status(400).json(accessErrors);
  }
  next();
};

// Get all product
exports.getProduct = (req, res) => {
  sort = sortAndLimit(req);
  product
    .find({})
    .limit(2)
    .skip(req.query.page * 2)
    .sort(sort)
    .exec(function (err, result) {
      res.json(result);
    });
};

// admin add product
exports.addProduct = (req, res) => {
  const { errors, isValid } = validateProduct(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const ProductFields = {};
  if (req.body.name) ProductFields.name = req.body.name;
  if (req.body.short_description)
    ProductFields.short_description = req.body.short_description;
  if (req.body.price) ProductFields.price = req.body.price;
  if (req.body.offer_price) ProductFields.offer_price = req.body.offer_price;
  if (req.body.discount) ProductFields.discount = req.body.discount;
  if (req.body.main_category)
    ProductFields.main_category = req.body.main_category;
  if (req.body.category) ProductFields.category = req.body.category;
  if (req.body.sub_category) ProductFields.sub_category = req.body.sub_category;
  if (req.body.product_description)
    ProductFields.product_description = req.body.product_description;
  if (req.body.brand) ProductFields.brand = req.body.brand;
  if (req.body.sold_by) ProductFields.sold_by = req.body.sold_by;
  if (req.body.thumbnail) ProductFields.thumbnail = req.body.thumbnail;
  if (req.body.stock) ProductFields.stock = req.body.stock;
  if (req.body.size) ProductFields.size = req.body.size;
  if (req.body.color) ProductFields.color = req.body.color;

  ProductFields.added_by = req.user.id;
  product
    .insertMany(new product(ProductFields))
    .then((product) => res.json(product))
    .catch((err) => res.status(404).json(err));
};

// admin product update
exports.updateProduct = (req, res) => {
  const { errors, isValid } = validateProduct(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const ProductFields = {};
  if (req.body.name) ProductFields.name = req.body.name;
  if (req.body.short_description)
    ProductFields.short_description = req.body.short_description;
  if (req.body.price) ProductFields.price = req.body.price;
  if (req.body.offer_price) ProductFields.offer_price = req.body.offer_price;
  if (req.body.discount) ProductFields.discount = req.body.discount;
  if (req.body.main_category)
    ProductFields.main_category = req.body.main_category;
  if (req.body.category) ProductFields.category = req.body.category;
  if (req.body.sub_category) ProductFields.sub_category = req.body.sub_category;
  if (req.body.product_description)
    ProductFields.product_description = req.body.product_description;
  if (req.body.brand) ProductFields.brand = req.body.brand;
  if (req.body.sold_by) ProductFields.sold_by = req.body.sold_by;
  if (req.body.thumbnail) ProductFields.thumbnail = req.body.thumbnail;
  if (req.body.stock) ProductFields.stock = req.body.stock;
  if (req.body.size) ProductFields.size = req.body.size;
  if (req.body.color) ProductFields.color = req.body.color;

  ProductFields.modefied_by = req.user.id;

  product
    .findByIdAndUpdate({ _id: req.params.product_id })
    .then((updateProduct) => {
      if (updateProduct) {
        product
          .findOneAndUpdate(
            { name: product.name },
            { $set: ProductFields },
            { new: true }
          )
          .then(res.json(updateProduct));
      }
    });
};

//Admin delete product by ID
exports.deleteProduct = (req, res) => {
  product
    .findByIdAndRemove({ _id: req.params.product_id })
    .then(res.json({ msg: "deteled successfully" }))
    .catch((err) => res.status(404).json(err));
};
