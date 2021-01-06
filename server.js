const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

const users = require('./routes/api/users.js');
const adminAuth = require('./routes/admin/admin_auth.js');
const adminProduct = require('./routes/admin/Ecommerce/product.js');
const adminEcommerceCategory = require('./routes/admin/Ecommerce/category.js');


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

//admin 
app.use('/admin', adminAuth);
app.use('/admin/ecommerce',adminProduct);
app.use('/admin/ecommerce', adminEcommerceCategory);

const port = process.envPORT || 3000;

app.listen(port, ()=> console.log(
  'server running on port', port
))

