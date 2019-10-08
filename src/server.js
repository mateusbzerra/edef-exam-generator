require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(
  'mongodb://localhost:27017/edefExamGenerator',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  function(err) {
    if (err) console.log('### error while conecting to database');
  }
);
app.use(express.json());

app.use(routes);

app.listen(8000);
