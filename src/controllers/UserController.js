const User = require('../models/User');
const bcrypt = require('bcryptjs');

class UserController {
  async store(req, res) {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    try {
      const user = await User.create(req.body);
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
}
module.exports = new UserController();
