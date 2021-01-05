const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

const users = require('./routes/api/users.js');
<<<<<<< HEAD
const admin = require('./routes/admin/admin_auth.js');
const adminProduct = require('./routes/admin/Ecommerce/product.js');
=======
const admin_auth = require('./routes/admin/admin_auth.js');
const adminEcommerceCategory = require('./routes/admin/Ecommerce/admin_category.js');
>>>>>>> 87d4a106ce2ca9098549be893c8b6ad6a9ee6dbe


// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db,{useNewUrlParser: true,useUnifiedTopology: true})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.use(passport.initialize());
require('./config/passport.js')(passport)

//Usr route
app.use('/api/users', users);

//Admin route
<<<<<<< HEAD
app.use('/admin/users',admin);

//admin product
app.use('/admin/ecommerce',adminProduct);
=======
app.use('/admin', admin_auth);
app.use('/admin/ecommerce', adminEcommerceCategory);
>>>>>>> 87d4a106ce2ca9098549be893c8b6ad6a9ee6dbe

const port = process.envPORT || 3000;

app.listen(port, ()=> console.log(
  'server running on port', port
))

