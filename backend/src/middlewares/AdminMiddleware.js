const jwt = require('jsonwebtoken');
const User = require('../models/User');
module.exports = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (user.admin) {
    return next();
  } else {
    return res.status(401).json({ error: 'Not allowed' });
  }
};
