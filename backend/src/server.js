require('dotenv').config();
const express = require('express');
require('express-async-errors');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const Youch = require('youch');
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
app.use(cors());
app.use(routes);
app.use(async (err, req, res, next) => {
  const errors = await new Youch(err, req).toHTML();
  return res.status(500).send(errors);
});

app.listen(8000);
