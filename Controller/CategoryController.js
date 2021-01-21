const validateMainCategory = require("../validation/main-category");
const validateCategory = require("../validation/category");
const validateSubCategory = require("../validation/sub-category");
const checkAdminUser = require("../validation/check-user");

const MainCategories = require("../models/main-category");
const SubCategories = require("../models/sub-category");
const Categories = require("../models/category");

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

exports.adminAccess = (req, res, next) => {
  const { accessErrors, accessIsValid } = checkAdminUser(req.user);
  if (!accessIsValid) {
    return res.status(400).json(accessErrors);
  }
  next();
};

exports.getMainCategory = (req, res) => {
  sort = sortAndLimit(req);
  const { accessErrors, accessIsValid } = checkAdminUser(req.user);
  if (!accessIsValid) {
    return res.status(400).json(accessErrors);
  }
  MainCategories.find({})
    .limit(2)
    .skip(req.query.page * 2)
    .sort(sort)
    .exec(function (err, result) {
      res.json(result);
    });
};

exports.getCategory = (req, res) => {
  sort = sortAndLimit(req);
  Categories.find({ main_category: req.params.maincategory_id })
    .limit(2)
    .skip(req.query.page * 2)
    .sort(sort)
    .exec(function (err, result) {
      res.json(result);
    });
};

exports.getSubCategory = (req, res) => {
  sort = sortAndLimit(req);
  SubCategories.find({ category: req.params.category_id })
    .limit(2)
    .skip(req.query.page * 2)
    .sort(sort)
    .exec(function (err, result) {
      res.json(result);
    });
};

exports.addMainCategory = (req, res) => {
  const { errors, isValid } = validateMainCategory(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const categoryfields = {};
  categoryfields.name = req.body.name;
  categoryfields.thumbnail = req.body.thumbnail;
  categoryfields.isActive = req.body.isActive;
  categoryfields.createdBy = req.user.id;

  MainCategories.findOne({ name: categoryfields.name }).then((category) => {
    if (category) {
      res.json({ msg: "catego already exists" });
    } else {
      const category = new MainCategories(categoryfields);
      category
        .save()
        .then((category) => res.json(category))
        .catch((err) => console.log(err));
    }
  });
};

exports.updateMainCategory = (req, res) => {
  const { errors, isValid } = validateMainCategory(req.body);
  if (!isValid) {
    res.json({ msg: errors });
    return res.status(400).json(errors);
  }
  const categoryfields = {};
  categoryfields.name = req.body.name;
  categoryfields.thumbnail = req.body.thumbnail;
  categoryfields.isActive = req.body.isActive;
  categoryfields.createdBy = req.user.id;

  MainCategories.findByIdAndUpdate({ _id: req.params.category_id }).then(
    (category) => {
      if (category) {
        MainCategories.findOneAndUpdate(
          { name: category.name },
          { $set: categoryfields },
          { new: true }
        ).then(res.json(categoryfields));
      }
    }
  );
};

exports.deleteMainCategory = (req, res) => {
  MainCategories.findByIdAndRemove({ _id: req.params.category_id })
    .then(res.json({ msg: "deteled successfully" }))
    .catch((err) => res.status(404).json(err));
};

exports.addCategory = (req, res) => {
  const { errors, isValid } = validateCategory(req.body);
  if (!isValid) {
    res.json({ msg: errors });
    return res.status(400).json(errors);
  }
  const categoryfields = {};
  categoryfields.name = req.body.name;
  categoryfields.thumbnail = req.body.thumbnail;
  categoryfields.isActive = req.body.isActive;
  categoryfields.createdBy = req.user.id;
  categoryfields.main_category = req.body.main_category;

  Categories.findOne({ name: categoryfields.name }).then((category) => {
    if (category) {
      res.json({ msg: "catego already exists" });
    } else {
      const category = new Categories(categoryfields);
      category
        .save()
        .then((category) => res.json(category))
        .catch((err) => console.log(err));
    }
  });
};

exports.updateCategory = (req, res) => {
  const { errors, isValid } = validateCategory(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const categoryfields = {};
  categoryfields.name = req.body.name;
  categoryfields.thumbnail = req.body.thumbnail;
  categoryfields.isActive = req.body.isActive;
  categoryfields.createdBy = req.user.id;
  categoryfields.main_category = req.body.main_category;

  Categories.findByIdAndUpdate({ _id: req.params.category_id }).then(
    (category) => {
      if (category) {
        Categories.findOneAndUpdate(
          { name: category.name },
          { $set: categoryfields },
          { new: true }
        ).then(res.json(categoryfields));
      }
    }
  );
};

exports.deleteCategory = (req, res) => {
  Categories.findByIdAndRemove({ _id: req.params.category_id })
    .then(res.json({ msg: "deteled successfully" }))
    .catch((err) => res.status(404).json(err));
};

exports.addSubCategory = (req, res) => {
  const { errors, isValid } = validateSubCategory(req.body);
  if (!isValid) {
    res.json({ msg: errors });
    return res.status(400).json(errors);
  }
  const categoryfields = {};
  categoryfields.name = req.body.name;
  categoryfields.thumbnail = req.body.thumbnail;
  categoryfields.isActive = req.body.isActive;
  categoryfields.createdBy = req.user.id;
  categoryfields.main_category = req.body.main_category;
  categoryfields.category = req.body.category;
  SubCategories.findOne({ name: categoryfields.name }).then((category) => {
    if (category) {
      res.json({ msg: "catego already exists" });
    } else {
      const category = new SubCategories(categoryfields);
      category
        .save()
        .then((category) => res.json(category))
        .catch((err) => console.log(err));
    }
  });
};

exports.updateSubCategory = (req, res) => {
  const { errors, isValid } = validateSubCategory(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const categoryfields = {};
  categoryfields.name = req.body.name;
  categoryfields.thumbnail = req.body.thumbnail;
  categoryfields.isActive = req.body.isActive;
  categoryfields.createdBy = req.user.id;
  categoryfields.main_category = req.body.main_category;
  categoryfields.category = req.body.category;

  SubCategories.findByIdAndUpdate({ _id: req.params.subCategory_id }).then(
    (category) => {
      if (category) {
        SubCategories.findOneAndUpdate(
          { name: category.name },
          { $set: categoryfields },
          { new: true }
        ).then(res.json(category));
      }
    }
  );
};

exports.deleteSubCategory = (req, res) => {
  SubCategories.findByIdAndRemove({ _id: req.params.category_id })
    .then(res.json({ msg: "deteled successfully" }))
    .catch((err) => res.status(404).json(err));
};

//Landing page main category fetch
exports.getLandingMainCategory = (req, res) => {
  MainCategories.find({})
    .then((main_category) => {
      if (main_category) {
        res.json(main_category);
      } else {
        res.json({ msg: "There is no category." });
      }
    })
    .catch((err) => res.status(404).json(err));
};

//Landing page category fetch
exports.getLandingCategory = (req, res) => {
  Categories.find({ main_category: req.params.id })
    .then((categories) => {
      if (categories) {
        res.json(categories);
      } else {
        res.json({ msg: "There is no category." });
      }
    })
    .catch((err) => res.status(404).json(err));
};
