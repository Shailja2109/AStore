const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

const users = require('./routes/api/users.js');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport.js')(passport)
  
app.get('/', (req, res)=> res.send('Hello u'));

app.use('/api/users', users);

const port = process.envPORT || 3000;

app.listen(port, ()=> console.log(
  'server running on port', port
))