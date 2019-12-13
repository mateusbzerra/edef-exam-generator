const User = require("../models/User");
const bcrypt = require("bcryptjs");

class UserController {
  async index(req, res) {
    try {
      const users = await User.find({}).select("-password");
      return res.json(users);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
  async show(req, res) {
    const reqUser = await User.findById(req.user.id);
    if (reqUser.admin || req.user.id === req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        return res.json(user);
      } catch (err) {
        return res.status(400).json({ error: err });
      }
    } else {
      return res.status(401).json({ error: "Not Allowed" });
    }
  }
  async store(req, res) {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    try {
      const user = await User.create(req.body);
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
  async update(req, res) {
    const reqUser = await User.findById(req.user.id);
    if (reqUser.admin || req.user.id === req.params.id) {
      try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
          new: true
        });
        return res.json(user);
      } catch (err) {
        return res.status(400).json({ error: err });
      }
    } else {
      return res.status(401).json({ error: "Not Allowed" });
    }
  }
  async delete(req, res) {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.json({ success: "User deleted successfully" });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
}
module.exports = new UserController();
