const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

const users = require('./routes/api/users.js');
const admin_auth = require('./routes/admin/admin_auth.js');
const adminEcommerceCategory = require('./routes/admin/Ecommerce/admin_category.js');


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
app.use('/admin', admin_auth);
app.use('/admin/ecommerce', adminEcommerceCategory);

const port = process.envPORT || 3000;

app.listen(port, ()=> console.log(
  'server running on port', port
))

